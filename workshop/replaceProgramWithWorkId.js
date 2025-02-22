const fs = require("fs").promises;
const path = require("path");

const concertsDataPath = "./extractedJSON/concertsDataWithVenueId.json";
const worksDataPath = "./extractedJSON/worksDataWithInstrumentation.json";
const processedConcertsDataPath = "./extractedJSON/concertsDataFinal.json";

async function writeToFile(file, content) {
  try {
    await fs.writeFile(file, JSON.stringify(content, null, 2));
    console.log(`Data written to ${file}`);
  } catch (error) {
    console.error("Error writing file:", error);
  }
}

async function readAndMatchData(concertsPath, worksPath) {
  try {
    // Read and parse JSON files
    const concertsData = JSON.parse(await fs.readFile(concertsPath, "utf-8"));
    const worksData = JSON.parse(await fs.readFile(worksPath, "utf-8"));

    // Create a map of works by their names and composers for easy lookup
    const worksMap = Object.values(worksData).reduce((map, work) => {
      const key = `${work.workName}_${work.workComposer}`;
      map[key] = work.id;
      return map;
    }, {});

    // Iterate over each concert in concertsData
    for (const concertId in concertsData) {
      const concert = concertsData[concertId];

      // Replace the program array with work IDs
      concert.program = concert.program
        .map((programEntry) => {
          const key = `${programEntry.workName}_${programEntry.workComposer}`;
          return worksMap[key] || null; // Use work ID if found, otherwise null
        })
        .filter(Boolean); // Remove nulls in case of unmatched works
    }

    // Write the updated concertsData to the destination file
    await writeToFile(processedConcertsDataPath, concertsData);
    console.log("Matching and updating process completed.");
  } catch (error) {
    console.error("Error during file reading or matching:", error);
  }
}

// Start the matching process
readAndMatchData(concertsDataPath, worksDataPath);
