const fs = require('fs').promises;
const path = require('path');

const concerts = { sourceFile: '../data/concertsData.json', destinationFolder: '../data/concerts' };
const composers = { sourceFile: '../data/composersData.json', destinationFolder: '../data/composers' };
const musicians = { sourceFile: '../data/musiciansData.json', destinationFolder: '../data/musicians' };
const works = { sourceFile: '../data/worksData.json', destinationFolder: '../data/works' };

function writeToFile(destinationFolder, content, subFolderNeeded) {
  let filePath = '';
  if (subFolderNeeded) {
    createSubfolder(destinationFolder, content.year);
    filePath = `${destinationFolder}/${content.year}/${content.id}.json`;
  } else {
    filePath = `${destinationFolder}/${content.id}.json`;
  }
  fs.writeFile(filePath, JSON.stringify(content, null, 2));
}

async function createSubfolder(destinationFolder, subfolder) {
  try {
    await fs.access(`${destinationFolder}/${subfolder}`);
  } catch {
    try {
      await fs.mkdir(`${destinationFolder}/${subfolder}`, { recursive: true });
    } catch (mkdirErr) {
      console.error('Error creating subfolder:', mkdirErr);
    }
  }
}

async function readSourceFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const parsedData = Object.entries(JSON.parse(content));
    return parsedData;
  } catch (err) {
    console.log('error while reading file', err);
  }
}

async function makeIndividualFiles(dataType, data) {
  let subFolderNeeded = false;
  if (dataType === concerts) {
    subFolderNeeded = true;
  } else {
    subFolderNeeded = false;
  }
  data.forEach(item => {
    writeToFile(dataType.destinationFolder, item[1], subFolderNeeded);
  });
}

async function processData(dataType) {
  const data = await readSourceFile(dataType.sourceFile);
  try {
    makeIndividualFiles(dataType, data);
  } catch (err) {
    console.log('error while processing data', err);
  }
}

processData(concerts);
processData(composers);
processData(musicians);
processData(works);
