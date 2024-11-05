const fs = require("fs").promises;
const path = require("path");

const sourceFolder = "./concertsOld";
// const sourceFolder = "./sampleData";
const destinationFolder = "./allMusicians";
const destinationFile = "./allMusicians.json";

const topBlock = { startStr: '<ul class="musicians">', endStr: "</ul>" };
const musicianBlock = { startStr: "<li>", endStr: "</li>" };
const nameBlock = { startStr: 'index.html">', endStr: "</a>" };
const instrumentBlock = { startStr: 'class="instrument">', endStr: "</span" };

function makeRegex(input) {
  const { startStr, endStr } = input;
  return new RegExp(`${startStr}([\\s\\S]*?)${endStr}`, "g");
}

// Helper function to extract matches based on a regex pattern
function extractMatches(itemArr, regex) {
  const matches = [];
  itemArr.forEach((item) => {
    let match;
    while ((match = regex.exec(item)) !== null) {
      matches.push(match[1].trim()); // Add the matched content to results
    }
  });

  return matches;
}

function splitNameStrToObject(nameStr) {
  const composerNameArray = nameStr.split(" ");
  return {
    nameArr: composerNameArray,
    firstName: composerNameArray.slice(0, -1).join(" "),
    lastName: composerNameArray[composerNameArray.length - 1],
  };
}

function createMusicianObject(itemArr, nameRegex, instrumentRegex) {
  const matches = [];

  itemArr.forEach((item) => {
    let personName = "";
    let instrument = "";
    // name match with regex
    const nameMatch = nameRegex.exec(item);
    if (nameMatch) {
      personName = nameMatch[1].trim();
    }
    // instrument match with regex
    const instrumentMatch = instrumentRegex.exec(item);
    if (instrumentMatch) {
      instrument = instrumentMatch[1].trim();
    }
    // Only push if both properties have been filled
    if (personName && instrument) {
      let nameArr = personName.toLowerCase().split(" ");
      let firstName = personName.slice(0, personName.lastIndexOf(" "));
      let lastName = personName.slice(personName.lastIndexOf(" "));
      let refId = `${nameArr[0]}${nameArr[nameArr.length - 1].charAt(0).toUpperCase()}${nameArr[nameArr.length - 1].slice(1)}`;
      let newMusician = {
        [refId]: {
          id: refId,
          fullName: personName,
          firstName: firstName,
          lastName: lastName,
          instrument: instrument,
        },
      };
      matches.push(newMusician); // Push object to matches array
    }
  });
  console.log(matches);
  return matches;
}

async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const finalResultArr = [];

    // Extract top-level sections using `topBlock`
    const sectionRegex = makeRegex(topBlock);
    const sections = extractMatches([content], sectionRegex);
    // console.log("Extracted top-level sections:", sections);

    // Extract musician blocks within each section
    const musicianRegex = makeRegex(musicianBlock);
    const musicians = extractMatches(sections, musicianRegex);
    // console.log("Extracted musicians:", musicians);

    // Extract names within each musician block
    const nameRegex = makeRegex(nameBlock);
    const instrumentRegex = makeRegex(instrumentBlock);
    const musicianArr = createMusicianObject(musicians, nameRegex, instrumentRegex);
    // console.log("Extracted names:", musicianArr);
    return await musicianArr;
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
  }
}

function writeToFile(file, content) {
  fs.writeFile(file, JSON.stringify(content, null, 2));
}

async function processDirectory(dir) {
  let results = [];
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
        results.push(...extractedFromFile);
        // console.log("processedData", processedData);
        // Placeholder: Here we'll later process each file
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
  // console.log("results", results);
  return results;
}

async function main() {
  // console.log("main function started");

  let dataToBeWritten = await processDirectory(sourceFolder);
  // console.log("main function ended");
  // console.log("dataToBeWritten", dataToBeWritten);
  return dataToBeWritten;
}

main().then((data) => {
  // console.log("data to be written", data);
  data.forEach((item, index) => {
    console.log(index, Object.keys(item)[0]);
    writeToFile(`${destinationFolder}/${Object.keys(item)[0]}.json`, data[index]);
  });
});
