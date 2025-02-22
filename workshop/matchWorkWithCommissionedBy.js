const fs = require("fs").promises;
const path = require("path");

const mainWorksFile = "./mergeSource/allWorks.json";
const commissionRecordFile = "./extractedJSON/commissionedWorks.json";
const destinationFile = "./extractedJSON/allWorksRev1.json";

async function writeToFile(file, content) {
  try {
    await fs.writeFile(file, JSON.stringify(content, null, 2));
    console.log(`Data written to ${file}`);
  } catch (error) {
    console.error("Error writing file:", error);
  }
}

async function readAndMatchData(mainWorksPath, commissionsPath) {
  try {
    // Read the JSON files
    const mainWorksData = await fs.readFile(mainWorksPath, "utf-8");
    const commissionsData = await fs.readFile(commissionsPath, "utf-8");

    const mainWorksParsed = JSON.parse(mainWorksData);
    const commissionsParsed = JSON.parse(commissionsData);

    // Create a map for fast lookups based on workName and composerId
    const commissionMap = new Map(commissionsParsed.map((commission) => [`${commission.workName}_${commission.composerId}`, commission.commissionedBy]));

    // Loop through each work in mainWorksParsed
    for (const workKey in mainWorksParsed) {
      const work = mainWorksParsed[workKey];
      const key = `${work.workName}_${work.workComposer}`;

      // Set commissionedBy to the matched value or an empty string
      work.commissionedBy = commissionMap.get(key) || "";
    }

    // Write the updated mainWorksParsed to the destination file
    await writeToFile(destinationFile, mainWorksParsed);
    console.log("Matching and writing process completed.");
  } catch (error) {
    console.error("Error during file reading or matching:", error);
  }
}

// Start the matching process
readAndMatchData(mainWorksFile, commissionRecordFile);
