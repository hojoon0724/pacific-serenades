const fs = require('fs').promises;
const path = require('path');

const concerts = { readFromFolder: '../data/concerts', writeToFile: '../data/concertsData.json' };
const composers = { readFromFolder: '../data/composers', writeToFile: '../data/composersData.json' };
const musicians = { readFromFolder: '../data/musicians', writeToFile: '../data/musiciansData.json' };
const works = { readFromFolder: '../data/works', writeToFile: '../data/worksData.json' };

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
        if (extractedFromFile && extractedFromFile.id) {
          console.log(fullPath, 'extracted');
          // console.log(extractedFromFile);
          results = { ...results, [extractedFromFile.id]: extractedFromFile };
        } else {
          console.warn(`Skipping file without valid data: ${fullPath}`);
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
    return {};
  }
  console.log(results);
  return results;
}

async function compileData(dataType) {
  let dataToBeWritten = await processDirectory(dataType.readFromFolder);
  writeToFile(dataType.writeToFile, dataToBeWritten);
}

compileData(concerts);
compileData(composers);
compileData(musicians);
compileData(works);
