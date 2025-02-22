const fs = require("fs").promises;
const path = require("path");

const mainWorksFile = "./mergeSource/allWorks.json";
const composersFile = "./extractedJSON/composersData.json";
const commissionRecordFile = "./extractedJSON/commissionedWorks.json";
const destinationFile = "./extractedJSON/commissionedWorks.json";

async function writeToFile(file, content) {
  try {
    await fs.writeFile(file, JSON.stringify(content, null, 2), "utf-8");
    console.log(`Data successfully written to ${file}`);
  } catch (err) {
    console.error("Error writing to file", err);
  }
}

async function readFullList(sourcePath, composerPath, matchingFile) {
  try {
    const mainWorksData = await fs.readFile(sourcePath, "utf-8");
    const composerData = await fs.readFile(composerPath, "utf-8");
    const commissionsData = await fs.readFile(matchingFile, "utf-8");

    const mainWorksParsed = JSON.parse(mainWorksData);
    const composerDataParsed = JSON.parse(composerData);
    const commissionsParsed = JSON.parse(commissionsData);

    // Create a map for composer fullName to composerId
    const composerMap = {};
    Object.values(composerDataParsed).forEach((composer) => {
      composerMap[composer.fullName] = composer.id;
    });

    // Add composerId to each commission if there's a matching composer fullName
    commissionsParsed.forEach((commission) => {
      const composerId = composerMap[commission.workComposer];
      if (composerId) {
        commission.composerId = composerId; // Add composerId to the commission object
      }
    });

    // Optionally write the updated commissions data back to the file
    await writeToFile(destinationFile, commissionsParsed);
    return commissionsParsed;
  } catch (err) {
    console.log("Error while reading file", err);
  }
}

async function startMatch() {
  const dataToBeWritten = await readFullList(mainWorksFile, composersFile, commissionRecordFile);
  return dataToBeWritten;
}

startMatch().then((data) => {
  console.log("Updated commissions data with composer IDs:", data);
});
