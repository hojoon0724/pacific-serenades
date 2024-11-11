const fs = require("fs").promises;
const path = require("path");

const sourceFile = "./allConcertsData.json";

function writeToFile(file, content) {
  fs.writeFile(file, JSON.stringify(content, null, 2));
}

async function readFullList(filePath) {
  let result = [];
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const parsedData = Object.entries(JSON.parse(content));
    parsedData.forEach((item) => {
      console.log(item[0]);
      let musician = {
        [item[0]]: {
          ...item[1],
        },
      };
      result = { ...result, ...musician };
    });
  } catch (err) {
    console.log("error while reading file", err);
  }
  console.log(result);
  return result;
}

async function makeIndividualMusician() {
  let dataToBeWritten = await readFullList(sourceFile);
  return dataToBeWritten;
}

makeIndividualMusician().then((data) => {
  for (const [key, value] of Object.entries(data)) {
    const object = {
      [key]: value,
    };
    writeToFile(`./concertData/${key}.json`, object);
  }
});
