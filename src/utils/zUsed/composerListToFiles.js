const fs = require('fs');
const path = require('path');

const readFilesFrom = '../data/allComposers.json';
const destinationFolder = '../data/composers';

function writeToFile(destination, content) {
  fs.writeFileSync(destination, JSON.stringify(content, null, 2));
}

async function readFullList(filePath) {
  let result = [];
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const parsedData = Object.entries(JSON.parse(content));
    parsedData.forEach(item => {
      console.log(item[0]);
      let composer = {
        [item[0]]: {
          ...item[1],
        },
      };
      result = { ...result, ...composer };
    });
  } catch (err) {
    console.log('error while reading file', err);
  }
  return result;
}

async function makeIndividualFiles() {
  let dataToBeWritten = await readFullList(sourceFile);
  return dataToBeWritten;
}

makeIndividualFiles().then(data => {
  for (const [key, value] of Object.entries(data)) {
    const object = {
      [key]: value,
    };
    writeToFile(`${destinationFolder}/${key}.json`, object);
  }
});
