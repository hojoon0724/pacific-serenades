const fs = require('fs');
const path = require('path');

const destination = './composerDatabase.json';
const source = './composers/';

function kebabToCamelCase(str) {
  return str.replace(/-./g, x => x[1].toUpperCase());
}

function writeToFile(destination, content) {
  fs.writeFileSync(destination, JSON.stringify(content, null, 2));
}

// make kebab-case folders into camelCase objects
// function makeKebabCaseFoldersToCamelCase(dir) {
//   fs.readdir(dir, { withFileTypes: true }, (err, files) => {
//     if (err) {
//       console.log(`Error reading ${dir}`, err);
//     }
//     files.forEach(file => {
//       const filename = file.name;
//       if (filename.includes('-')) {
//         const objectName = kebabToCamelCase(filename);
//         const firstLastNameArr = filename.split('-', 2);
//         const person = { [objectName]: { firstName: firstLastNameArr[0], lastName: firstLastNameArr[1] } };
//         console.log(person);
//       }
//     });
//   });
// }

const testFilePath = './composers/alban-berg/index.html';
const testSearchRegex = /<span class="years">(.*?)<\/span>/g;

function readFileAndReturn(file, regex, callback) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return callback(err, null); // Pass the error to the callback
    }

    const matches = [];
    let match;

    // Loop through all matches
    while ((match = regex.exec(data)) !== null) {
      matches.push(match[1]); // Collect each match
    }

    callback(null, matches); // Pass the matches back to the callback
  });
}

// function checkManyFiles(arr) {
//   arr.forEach(file => {
//     readFileAndReturn(file, testSearchRegex);
//   });
// }
// checkManyFiles(testFilePathArr);

const jsonSearchRegex = /<script type="application\/ld\+json" class="yoast-schema-graph">(.*?)<\/script>/g;

readFileAndReturn(testFilePath, jsonSearchRegex, (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  const jsonData = data.map(item => JSON.parse(item)); // Parse each string to JSON
  writeToFile(destination, jsonData); // Call writeToFile with the extracted data
});

// console.log(jsonData);

// writeToFile(destination, jsonData);

// -----------------------------------------------------
// - Final Run Below
// -----------------------------------------------------

function createComposerDataFromOriginal(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        // console.log(`Found directory: ${fullPath}`);
        createComposerDataFromOriginal(fullPath);
      } else {
        // console.log(`Found file: ${fullPath}`);
        readFileAndReturn(fullPath, testSearchRegex);
      }
    });
  });
}

// createComposerDataFromOriginal(source);
