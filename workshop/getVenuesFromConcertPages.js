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
// const sampleRegex = /<script type="application\/ld\+json" class="yoast-schema-graph">(.*?)<\/script>/g;
const sampleRegex = /<main class=(.*?)main>/g;
// const startStr = '<main class="main concerts" role="main">';
// const endStr = "</main>";

function makeRegex(input) {
  const startStr = input.startStr;
  const endStr = input.endStr;
  return new RegExp(`${startStr}([\\s\\S]*?)${endStr}`, "g");
}

const concertTitle = {
  startStr: "<h1>",
  endStr: "</h1>",
};

const venues = {
  startStr: '<span class="venue">',
  endStr: "</span>",
};

const concertRegex = makeRegex(concertTitle);
const venuesRegex = makeRegex(venues);

// const assembledRegex = new RegExp(`${venueLookup.startStr}([\\s\\S]*?)${venueLookup.endStr}`, "g");

getPageMainSection(sampleDirs[1], concertRegex);
getPageMainSection(sampleDirs[1], venuesRegex);

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
      // data.map((entry) => {
      //   console.log(entry);
      // });
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

function readAllFilesThenWriteInOneFile(dir) {
  const allVenues = [];

  return new Promise((resolve, reject) => {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error(`Error reading directory ${dir}:`, err);
        return reject(err);
      }

      const promises = files.map((file) => {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
          // Recursively read directories and return their promise
          return readAllFilesThenWriteInOneFile(fullPath).then((venues) => {
            allVenues.push(...venues); // Spread the results into allVenues
          });
        } else {
          const folderNameKebab = dir.slice(12);
          const folderNameCamel = kebabToCamel(folderNameKebab);

          // Return the promise from getPageMainSection
          return getPageMainSection(fullPath, venuesRegex).then((venueData) => {
            // console.log(venueData);
            allVenues.push(venueData); // Collect venue data
          });
        }
      });

      // Wait for all promises to resolve
      Promise.all(promises)
        .then(() => {
          resolve(allVenues); // Resolve the promise with the accumulated data
        })
        .catch(reject);
    });
  });
}

// Start the process and handle the final write
readAllFilesThenWriteInOneFile(sourceFolder)
  .then((allVenues) => {
    // Flatten the array if necessary and write to file
    const flattenedVenues = allVenues.flat();
    console.log("Total venues collected:", flattenedVenues.length);
    writeToFile("./venues.json", flattenedVenues);
  })
  .catch((error) => {
    console.error("Error processing files:", error);
  });
