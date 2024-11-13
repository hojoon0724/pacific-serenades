const fs = require('fs').promises;
const path = require('path');

const data = {
  concerts: { sourceFile: '../data/concertsData.json', destinationFolder: '../data/concerts' },
  composers: { sourceFile: '../data/composersData.json', destinationFolder: '../data/composers' },
  musicians: { sourceFile: '../data/musiciansData.json', destinationFolder: '../data/musicians' },
  works: { sourceFile: '../data/worksData.json', destinationFolder: '../data/works' },
};

const writeTo = data.concerts;

const sourceFile = writeTo.sourceFile;
const destinationFolder = writeTo.destinationFolder;

function writeToFile(destination, content) {
  fs.writeFile(destination, JSON.stringify(content, null, 2));
}

async function createSubfolder(destinationFolder, subfolder) {
  try {
    await fs.access(`${destinationFolder}/${subfolder}`);
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
      // console.log(item[1].year);
      // createSubfolder(destinationFolder, item[1].year);
      writeToFile(`${destinationFolder}/${item[1].year}/${item[0]}.json`, entry);
      // writeToFile(`${destinationFolder}/${item[0]}.json`, entry);
      // result = { ...result, ...entry };
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

readSourceFile(sourceFile);

// makeIndividualFiles().then(data => {
//   for (const [key, value] of Object.entries(data)) {
//     const object = {
//       [key]: value,
//     };
//     writeToFile(`${destinationFolder}/${value.year}/${key}.json`, object);
//     writeToFile(`${destinationFolder}/${key}.json`, object);
//   }
// });
