const fs = require('fs').promises;
const path = require('path');

// Composers // Concerts // Musicians // Works

const composersFolder = '../data/composers';
const concertsFolder = '../data/concerts';
const musiciansFolder = '../data/musicians';
const worksFolder = '../data/works';

const composersData = '../data/composersData.json';
const concertsData = '../data/concertsData.json';
const musiciansData = '../data/musiciansData.json';
const worksData = '../data/worksData.json';

async function writeToFile(file, content) {
  try {
    await fs.writeFile(file, JSON.stringify(content, null, 2));
  } catch (err) {
    console.log(`Error up in this bitch`, err);
  }
}

async function processFile(filePath) {
  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    const parsedData = JSON.parse(fileData);
    return parsedData;
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return {};
  }
}

async function processDirectory(dir) {
  let results = {};

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await processDirectory(fullPath).then(stuff => {
          results = { ...results, ...stuff };
        });
      } else if (entry.isFile()) {
        const extractedFromFile = await processFile(fullPath);
        results = { ...results, ...extractedFromFile };
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
    return {};
  }

  return results;
}

async function compileData(sourceFolder, targetFile) {
  let dataToBeWritten = await processDirectory(sourceFolder);
  return [dataToBeWritten, targetFile];
}

compileData(composersFolder, composersData).then(data => {
  writeToFile(data[1], data[0]);
});

compileData(concertsFolder, concertsData).then(data => {
  writeToFile(data[1], data[0]);
});

compileData(musiciansFolder, musiciansData).then(data => {
  writeToFile(data[1], data[0]);
});

compileData(worksFolder, worksData).then(data => {
  writeToFile(data[1], data[0]);
});
