const fs = require('fs');
const path = require('path');

// Read the old html and get the data

const destinationFolder = './composersJson';
const source = './composers';

const composerYearsLookupRegex = /<span class="years">(.*?)<\/span>/g;
const jsonLookupRegex = /<script type="application\/ld\+json" class="yoast-schema-graph">(.*?)<\/script>/g;

function writeToFile(file, content) {
  fs.writeFileSync(file, JSON.stringify(content, null, 2));
}

function readFileAndReturnRegexMatch(file, regex) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const matches = [];
      let match;
      while ((match = regex.exec(data)) !== null) {
        matches.push(match[1]);
      }
      resolve(matches);
    });
  });
}

// Get composer dates
function getComposerDates(fullPath) {
  return readFileAndReturnRegexMatch(fullPath, composerYearsLookupRegex)
    .then(data => {
      if (data.length !== 0) {
        const splitDates = data[0].slice(1, -1).split(' – ');
        return { born: splitDates[0], died: splitDates[1] };
      }
      return null;
    })
    .catch(err => {
      console.error(`Error getting composer dates from ${fullPath}:`, err.message);
      return null;
    });
}

// Get composer name
function getComposerName(fullPath) {
  return readFileAndReturnRegexMatch(fullPath, jsonLookupRegex)
    .then(data => {
      if (data.length > 0) {
        const parsedData = JSON.parse(data[0]);
        const composerNameStr = parsedData['@graph'][0].name.split(' - ')[0].toLowerCase();
        return splitNameStrToObject(composerNameStr);
      }
      return null;
    })
    .catch(err => {
      console.error(`Error getting composer name from ${fullPath}:`, err.message);
      return null;
    });
}

// Split name into an object
function splitNameStrToObject(nameStr) {
  const composerNameArray = nameStr.split(' ');
  return {
    nameArr: composerNameArray,
    firstName: composerNameArray.slice(0, -1).join(' '),
    lastName: composerNameArray[composerNameArray.length - 1],
  };
}

// Main function
function applyFunctionToEachFileInAllFolders(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach(file => {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        applyFunctionToEachFileInAllFolders(fullPath);
      } else {
        Promise.all([getComposerName(fullPath), getComposerDates(fullPath)])
          .then(([composerName, composerDates]) => {
            const composerObject = {
              nameArr: composerName.nameArr,
              firstName: composerName.firstName,
              lastName: composerName.lastName,
              born: composerDates ? composerDates.born : '',
              died: composerDates ? composerDates.died : '',
            };
            console.log(composerObject);
          })
          .catch(err => {
            console.log('Error processing file:', err);
          });
      }
    });
  });
}
applyFunctionToEachFileInAllFolders(source);
