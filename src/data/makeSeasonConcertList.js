const fs = require('fs').promises;
const path = require('path');

const sourceFile = './allSeasons.json';

function writeToFile(file, content) {
  fs.writeFile(file, JSON.stringify(content, null, 2));
}

async function readFullList(filePath) {
  let result = [];
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const parsedData = Object.entries(JSON.parse(content));

    for (const [key, value] of Object.entries(JSON.parse(content))) {
      let concertArr = [];
      value.forEach(concert => {
        concertNameCamel = concert.concertTitle
          .toLowerCase()
          .replace(/\s./g, x => `-${x[1]}`)
          .replace(/-./g, x => x[1].toUpperCase())
          .replace(/[^a-zA-Z0-9 ]/g, '');
        // console.log(concertNameCamel);
        concertArr.push(concertNameCamel);
      });
      let season = {
        [key]: concertArr,
      };
      result = { ...result, ...season };
    }
  } catch (err) {
    console.log('error while reading file', err);
  }
  // console.log(result);
  return result;
}

async function makeSeasonDb() {
  let dataToBeWritten = await readFullList(sourceFile);
  return dataToBeWritten;
}

// makeIndividualMusician().then((data) => {
//   for (const [key, value] of Object.entries(data)) {
//     const object = {
//       [key]: value,
//     };
//     writeToFile(`./processedMusicians/${key}.json`, object);
//   }
// });

makeSeasonDb().then(data => {
  writeToFile(`./seasonConcertsList.json`, data);
});
