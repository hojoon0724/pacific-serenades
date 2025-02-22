const fs = require('fs').promises;
const path = require('path');

const sourceFile = '../data/allConcertsWithVenueID.json';
const venuesFile = '../data/venues.json';

async function readFullList(sourcePath, venuePath) {
  const countMap = new Map();

  try {
    const sourceData = await fs.readFile(sourcePath, 'utf-8');
    const venueData = await fs.readFile(venuePath, 'utf-8');
    const parsedData = JSON.parse(sourceData);
    const parsedVenueData = JSON.parse(venueData);
    // console.log(parsedVenueData);

    for (const [key, value] of Object.entries(parsedVenueData)) {
      countMap.set(value.id, 0);
    }

    for (const [key, value] of Object.entries(parsedData)) {
      value.dates.forEach(date => {
        countMap.has(date.venueId)
          ? countMap.set(date.venueId, countMap.get(date.venueId) + 1)
          : countMap.set(date.venueId, 1);
      });
    }

    console.log(countMap);
  } catch (err) {
    console.log('error while reading file', err);
  }
}

readFullList(sourceFile, venuesFile);
