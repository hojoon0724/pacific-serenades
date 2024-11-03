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
const sampleRegex = /<script type="application\/ld\+json" class="yoast-schema-graph">(.*?)<\/script>/g;
const startStr = '<main class="main concerts" role="main">';
const endStr = "</main>";
// const mainRegex = new RegExp(`${startStr}(.*?)${endStr}`, "g");
const mainRegex = /<main class="main concerts" role="main">(.*?)<\/main>/g;

const venueLookup = { startStr: '<span class="day">', endStr: "</span>" };

const assembledRegex = new RegExp(`${venueLookup.startStr}(.*?)${endStr}`, "g");

console.log(mainRegex);
getPageMainSection(sampleDirs[1], mainRegex);

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

async function getPageMainSection(fullPath, regex) {
  try {
    const data = await readFileAndReturnRegexMatch(fullPath, regex);
    if (data && data.length > 0) {
      console.log("Data found:", data);
      return data;
    } else {
      console.log("No data found for regex in file:", fullPath);
      return null;
    }
  } catch (err) {
    console.error(`Error getting composer dates from ${fullPath}:`, err.message);
    return null;
  }
}
function readAllFiles(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        readAllFiles(fullPath);
      } else {
        const folderNameKebab = dir.slice(12);
        const folderNameCamel = kebabToCamel(folderNameKebab);
        console.log(folderNameCamel);
        Promise.all([]).then(([]) => {});
      }
    });
  });
}

// readAllFiles(sourceFolder);
