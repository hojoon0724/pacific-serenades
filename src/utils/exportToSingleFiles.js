const fs = require('fs').promises;
const path = require('path');

const data = {
  concerts: { sourceFile: '../data/allConcerts.json', destinationFolder: '../data/concerts' },
  composer: { sourceFile: '../data/allComposers.json', destinationFolder: '../data/composers' },
  musicians: { sourceFile: '../data/allMusicianss.json', destinationFolder: '../data/musicianss' },
};

const sourceFile = '../data/allComposers.json';
const destinationFolder = '../data/composers';

function writeToFile(destination, content) {
  fs.writeFile(destination, JSON.stringify(content, null, 2));
}

async function createSubfolder(destination, subfolder) {
  try {
    await fs.access(`${destination}/${subfolder}`);
  } catch {
    await fs.mkdir(`${destinationFolder}/${subfolder}`);
  }
}

async function readSourceFile(filePath) {
  let result = [];
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const parsedData = Object.entries(JSON.parse(content));
    parsedData.forEach(item => {
      let entry = {
        [item[0]]: {
          ...item[1],
        },
      };
      result = { ...result, ...entry };
    });
  } catch (err) {
    console.log('error while reading file', err);
  }
  return result;
}

async function makeIndividualFiles() {
  let dataToBeWritten = await readSourceFile(sourceFile);
  return dataToBeWritten;
}

makeIndividualFiles().then(data => {
  for (const [key, value] of Object.entries(data)) {
    const object = {
      [key]: value,
    };
    // createSubfolder(destinationFolder, value.year);
    // writeToFile(`${destinationFolder}/${value.year}/${key}.json`, object);
    writeToFile(`${destinationFolder}/${key}.json`, object);
  }
});
