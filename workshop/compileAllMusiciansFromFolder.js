const fs = require("fs").promises;
const path = require("path");

const sourceFolder = "./allMusicians";
const destinationFile = "./allMusicians.json";

function writeToFile(file, content) {
  fs.writeFile(file, JSON.stringify(content, null, 2));
}

async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    let finalResultArr = [];

    // console.log(`filePath: ${filePath}`);
    const parsedData = JSON.parse(content);

    const objectKey = Object.keys(parsedData)[0]; // Gets the first-level key (e.g., "yukikoKamei")
    // console.log(objectKey);
    // console.log(parsedData[objectKey]);

    return parsedData[objectKey];
    // finalResultArr = { ...finalResultArr, ...newMusician };
    // const musicianData = content[objectKey]; // Accesses the nested object

    // console.log(`Object key: ${objectKey}`); // Logs: "yukikoKamei"
    // console.log("Musician Data:", musicianData); // Logs the inner object for "yukikoKamei"

    // console.log(finalResultArr);
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
  }
}

async function processDirectory(dir) {
  let results = [];
  // console.log(`Reading directory: ${dir}`);

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      // console.log(fullPath);

      if (entry.isDirectory()) {
        console.log("this is a folder yo");
        //   // console.log(`Found directory: ${fullPath}`);
        //   // await processDirectory(fullPath).then((stuff) => {
        //   // console.log("stuff", stuff);
        //   // results.push(...stuff);
        //   // }); // Recurse into subdirectory
      } else if (entry.isFile()) {
        //   // console.log(`Found file: ${fullPath}`);
        const extractedFromFile = await processFile(fullPath);
        console.log("extracted from file", extractedFromFile);
        // const parsedData = JSON.parse(extractedFromFile);
        // console.log(parsedData);
        const objectKey = extractedFromFile.id;
        let newMusician = {
          [objectKey]: {
            id: objectKey,
            fullName: extractedFromFile.fullName,
            firstName: extractedFromFile.firstName,
            lastName: extractedFromFile.lastName,
            instrument: extractedFromFile.instrument,
          },
          // };
          // console.log(newMusician);
        };
        results = { ...results, ...newMusician };
        // console.log(`reslusts`, results);
        // results.push(...extractedFromFile);
        // console.log("processedData", processedData);
        // Placeholder: Here we'll later process each file
      }
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
  console.log("dataToBeWritten", dataToBeWritten);
  return dataToBeWritten;
}

main().then((data) => {
  writeToFile(destinationFile, data);
});
