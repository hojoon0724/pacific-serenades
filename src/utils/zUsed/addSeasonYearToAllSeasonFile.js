const fs = require('fs').promises;
const path = require('path');

const sourceFile = '../data/allSeasons.json';
const newFile = '../data/allSeasonsWithYear.json';

function writeToFile(file, content) {
  fs.writeFile(file, JSON.stringify(content, null, 2));
}

async function readFullList(sourcePath) {
  let processedData = {};
  try {
    const sourceData = await fs.readFile(sourcePath, 'utf-8');

    // console.log(sourceData);

    for (const [key, value] of Object.entries(JSON.parse(sourceData))) {
      let seasonConcerts = [];
      const year = key.slice(0, 4);
      value.forEach(concert => {
        concert.year = year;
        // console.log(concert);
        seasonConcerts.push(concert);
      });
      console.log(` `);
      console.log(seasonConcerts);

      processedData = { ...processedData, [key]: seasonConcerts };
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
