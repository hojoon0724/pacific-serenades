const fs = require("fs").promises;
const path = require("path");

const mainWorksFile = "./mergeSource/worksData.json";
const concertsRecordFile = "./extractedJSON/concertsDataWithVenueID.json";
const destinationFile = "./extractedJSON/worksDataWithInstrumentation.json";

async function writeToFile(file, content) {
  try {
    await fs.writeFile(file, JSON.stringify(content, null, 2));
    console.log(`Data written to ${file}`);
  } catch (error) {
    console.error("Error writing file:", error);
  }
}

async function readAndMatchData(mainWorksPath, concertsPath) {
  try {
    // Read and parse JSON files
    const mainWorksData = JSON.parse(await fs.readFile(mainWorksPath, "utf-8"));
    const concertsRecordData = JSON.parse(await fs.readFile(concertsPath, "utf-8"));

    // Iterate over each work in mainWorksData
    for (const workId in mainWorksData) {
      const work = mainWorksData[workId];

      // Search for matching instrumentation in the concertsRecordData
      for (const concertId in concertsRecordData) {
        const concert = concertsRecordData[concertId];

        // Check each program entry in the concert to find a match
        for (const programEntry of concert.program) {
          if (programEntry.workName === work.workName && programEntry.workComposer === work.workComposer) {
            // Add the instrumentation if a match is found
            work.instrumentation = programEntry.workInstrumentation;
            break;
          }
        }
      }
    }

    // Write the updated mainWorksData to the destination file
    await writeToFile(destinationFile, mainWorksData);
    console.log("Matching and writing process completed.");
  } catch (error) {
    console.error("Error during file reading or matching:", error);
  }
}

// Start the matching process
readAndMatchData(mainWorksFile, concertsRecordFile);
