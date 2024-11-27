const fs = require('fs').promises;
const path = require('path');

const sourceFile = '../data/allConcerts.json';
const newFile = '../data/allConcertsWithYear.json';

function writeToFile(file, content) {
  fs.writeFile(file, JSON.stringify(content, null, 2));
}

async function readFullList(sourcePath) {
  let processedData = {};
  try {
    const sourceData = await fs.readFile(sourcePath, 'utf-8');
    const parsedSourceData = JSON.parse(sourceData);

    let concertObj = {};

    for (const [key, value] of Object.entries(JSON.parse(sourceData))) {
      // console.log(key);
      // console.log(value.dates[0].date);
      const year = value.dates[0].date.slice(0, 4);
      value.year = year;
      processedData = { ...processedData, [key]: value };
    }
  } catch (err) {
    console.log('error while reading file', err);
  }

  // console.log(processedData);
  return processedData;
}

async function executeMatch() {
  let dataToBeWritten = await readFullList(sourceFile);
  // console.log(dataToBeWritten);
  return dataToBeWritten;
}

executeMatch().then(data => {
  writeToFile(`${newFile}`, data);
});
