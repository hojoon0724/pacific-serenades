// script to rename concert IDs to include year and concert number

import fs from "fs/promises";

const seasonDataFileToReadFrom = "../src/data/seasons.json";
const seasonDataFileToWriteTo = "../src/data/serving/seasons.json";

const concertDataFileToReadFrom = "../src/data/concertsData.json";
const concertDataFileToWriteTo = "../src/data/serving/concertsData.json";

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

async function findAndChangeConcertIdTogether(concertsData, concertId) {}

async function main() {
  const seasonsData = await readFile(seasonDataFileToReadFrom);
  const concertsDataInput = await readFile(concertDataFileToReadFrom);
  const concertsData = Array.isArray(concertsDataInput)
    ? Object.fromEntries(concertsDataInput.map((concert) => [concert.id, concert]))
    : concertsDataInput;

  const seasonsEntries = Array.isArray(seasonsData)
    ? seasonsData.map((season) => [season.year, season])
    : Object.entries(seasonsData);

  for (const [year, season] of seasonsEntries) {
    console.log(`--- ${year} ---`);
    const total = season.concertIds.length;
    season.concertIds.map((concertId, index) => {
      const newConcertId = `${year}-${String(total - index).padStart(2, "0")}-${concertId}`;
      console.log(`Renaming concert ID ${concertId} to ${newConcertId}`);

      if (!concertsData[concertId]) {
        console.warn(`Concert ID ${concertId} not found in concerts data. Skipping.`);
      } else {
        console.log(`${concertId} found, renaming to ${newConcertId}`);
        season.concertIds[index] = newConcertId;
        // update the concert data with the new ID as well
        const oldConcertData = concertsData[concertId];
        delete concertsData[concertId];
        concertsData[newConcertId] = {
          ...oldConcertData,
          id: newConcertId,
        };
      }
    });
    season.concertIds.sort((a, b) => a.localeCompare(b));
  }

  const updatedSeasonsData = seasonsEntries.map(([year, season]) => ({
    year,
    ...season,
  }));
  const updatedConcertsData = Object.values(concertsData).sort((a, b) => a.id.localeCompare(b.id));
  const updatedSeasonsDataJson = JSON.stringify(updatedSeasonsData.reverse(), null, 2);
  const updatedConcertsDataJson = JSON.stringify(updatedConcertsData, null, 2);

  await fs.writeFile(seasonDataFileToWriteTo, updatedSeasonsDataJson, "utf-8");
  await fs.writeFile(concertDataFileToWriteTo, updatedConcertsDataJson, "utf-8");

  console.log(updatedSeasonsDataJson);
}

main();
