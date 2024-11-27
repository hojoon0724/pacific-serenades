const fs = require('fs').promises;
const path = require('path');

const sourceFile = '../data/allSeasons.json';
const lookupFile = '../data/allConcerts.json';

async function readFullList(sourcePath, lookupPath) {
  let result = [];
  let processedData = {};

  const concertsMap = new Map();

  try {
    const sourceData = await fs.readFile(sourcePath, 'utf-8');
    const lookupData = await fs.readFile(lookupPath, 'utf-8');
    const lookupArr = JSON.parse(lookupData);

    for (const [key, value] of Object.entries(JSON.parse(lookupData))) {
      concertsMap.set(key, 0);
    }
    for (const [key, value] of Object.entries(JSON.parse(sourceData))) {
      value.forEach(concert => {
        concertsMap.has(concert.id)
          ? concertsMap.set(concert.id, concertsMap.get(concert.id) + 1)
          : console.log(`can't find ${concert.id}`);
      });
      // value.concerts.forEach(concert => {
      //   console.log(concert.concertTitle);
      // });
    }
  } catch (err) {
    console.log('error while reading file', err);
  }
  console.dir(concertsMap, { depth: null });
  return processedData;
}

async function executeMatch() {
  let result = await readFullList(sourceFile, lookupFile);
  // console.log(result);
  return result;
}

executeMatch();
