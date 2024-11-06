const fs = require("fs").promises;
const path = require("path");

const sourceFolder = "./allMusicians";

async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    let finalResultArr = [];

    // console.log(`filePath: ${filePath}`);
    const parsedData = JSON.parse(content);

    const objectKey = Object.keys(parsedData)[0]; // Gets the first-level key (e.g., "yukikoKamei")
    // console.log(objectKey);
    // console.log(parsedData[objectKey]);

    finalResultArr = { ...finalResultArr, ...newMusician };
    // const musicianData = content[objectKey]; // Accesses the nested object

    // console.log(`Object key: ${objectKey}`); // Logs: "yukikoKamei"
    // console.log("Musician Data:", musicianData); // Logs the inner object for "yukikoKamei"

    // console.log(finalResultArr);
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
  }
}

async function processDirectory(dir) {
  let results = {};
  // console.log(`Reading directory: ${dir}`);

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // console.log(`Found directory: ${fullPath}`);
        await processDirectory(fullPath).then((stuff) => {
          // console.log("stuff", stuff);
          results.push(...stuff);
        }); // Recurse into subdirectory
      } else if (entry.isFile()) {
        // console.log(`Found file: ${fullPath}`);
        const extractedFromFile = await processFile(fullPath);
        const parsedData = JSON.parse(extractedFromFile);

        // const objectKey = Object.keys(parsedData)[0];

        // let newMusician = {
        //   [objectKey]: {
        //     id: objectKey,
        //     fullName: parsedData[objectKey].fullName,
        //     firstName: parsedData[objectKey].firstName,
        //     lastName: parsedData[objectKey].lastName,
        //     instrument: parsedData[objectKey].instrument,
        //   },
      }
      results = { ...results, ...newMusician };
      console.log(`reslusts`, results);
      // results.push(...extractedFromFile);
      // console.log("processedData", processedData);
      // Placeholder: Here we'll later process each file
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
  console.log("results", results);
  return results;
}

async function main() {
  // console.log("main function started");

  let dataToBeWritten = await processDirectory(sourceFolder);
  // console.log("main function ended");
  // console.log("dataToBeWritten", dataToBeWritten);
  return dataToBeWritten;
}

main();
