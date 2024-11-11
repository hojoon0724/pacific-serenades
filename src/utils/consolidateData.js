const fs = require('fs').promises;
const path = require('path');

// Composers // Concerts // Musicians //

const composersFolder = '../data/composers';
const concertsFolder = '../data/concerts';
const musiciansFolder = '../data/musicians';

const allComposers = '../data/allComposers.json';
const allConcerts = '../data/allConcerts.json';
const allMusicians = '../data/allMusicians.json';

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

compileData(composersFolder, allComposers).then(data => {
  writeToFile(data[1], data[0]);
});

compileData(concertsFolder, allConcerts).then(data => {
  writeToFile(data[1], data[0]);
});

compileData(musiciansFolder, allMusicians).then(data => {
  writeToFile(data[1], data[0]);
});
