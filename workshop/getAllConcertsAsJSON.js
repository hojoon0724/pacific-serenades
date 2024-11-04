const fs = require("fs");
const path = require("path");

const sourceFolder = "./concertsOld";
const destinationFolder = "./concertsNew";

const sampleDirs = ["concertsOld/weavers-of-delight/index.html", "concertsOld/when-playful-and-serious-meet/index.html", "concertsOld/we-all-inhabit-this-small-planet/index.html", "concertsOld/woven-of-many-strands/index.html"];

function kebabToCamel(str) {
  return str.replace(/-./g, (x) => x[1].toUpperCase());
}

function writeToFile(file, content) {
  fs.writeFileSync(file, JSON.stringify(content, null, 2));
}

// input = {startStr: "start string",
//          endStr: "ending string"}
function makeRegexWithMiddle(input) {
  const { startStr, midStr, endStr } = input;
  return new RegExp(`${startStr}[\\s\\S]*?${midStr}([\\s\\S]*?)${endStr}`, "g");
}
function makeRegex(input) {
  const { startStr, endStr } = input;
  return new RegExp(`${startStr}([\\s\\S]*?)${endStr}`, "g");
}

function readFileAndReturnRegexMatch(file, regex) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const matches = [];
      let match;
      while ((match = regex.exec(data)) !== null) {
        matches.push(match[1]);
      }
      resolve(matches);
    });
  });
}

async function getFromRegex(fullPath, regex) {
  try {
    const data = await readFileAndReturnRegexMatch(fullPath, regex);
    if (data && data.length > 0) {
      // console.log(data[0]);
      return data[0];
    } else {
      console.log("No data found for regex in file:", fullPath);
      return null;
    }
  } catch (err) {
    console.error(`Error getting shit from ${fullPath}:`, err.message);
    return null;
  }
}

const topBlock = { startStr: '<ul class="musicians">', endStr: "</ul>" };
const musicianBlock = { startStr: "<li>", endStr: "</li>" };
const nameBlock = { startStr: 'index.html">', endStr: "</a>" };

// Main function
async function applyFunctionToEachFileInAllFolders(dir) {
  const finalMusiciansOutput = []; // To store the final musician data
  try {
    const files = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        await applyFunctionToEachFileInAllFolders(fullPath);
      } else {
        const musicianBlockRegex = makeRegex(topBlock);
        const topBlockContent = await getFromRegex(fullPath, musicianBlockRegex);

        if (topBlockContent) {
          const allMusiciansArr = Array.from(topBlockContent.matchAll(makeRegex(musicianBlock)));

          // Process each musician match
          allMusiciansArr.forEach((match) => {
            const musician = { name: "", instrument: "" };
            const nameMatch = match[0].match(/class="musician"><a href="[^"]+">([^<]+)<\/a>/);
            const instrumentMatch = match[0].match(/class="instrument">([^<]+)<\/span>/);

            // Assign matched values if they exist
            musician.name = nameMatch ? nameMatch[1] : "";
            musician.instrument = instrumentMatch ? instrumentMatch[1] : "";

            // Store the musician object in the output array
            finalMusiciansOutput.push(musician);
          });

          console.log("Extracted Musicians:", finalMusiciansOutput);
          writeToFile("./musiciansTest.json", finalMusiciansOutput);
        } else {
          console.log(`No musician data found in ${fullPath}`);
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
}

// const performersBlock = getFromRegex(fullPath, musicianBlockRegex);
// console.log(performersBlock);
// const nameMatch = makeRegex({ startStr: 'class="musician"><a href="[^"]+">', endStr: "</a>" }).exec(performersBlock);
// const instrumentMatch = makeRegex({ startStr: 'class="instrument">', endStr: "</span>" }).exec(performersBlock);
// musician.name = nameMatch ? nameMatch[1] : "";
// musician.instrument = instrumentMatch ? instrumentMatch[1] : "";
// console.log(musician);

applyFunctionToEachFileInAllFolders(sourceFolder);
