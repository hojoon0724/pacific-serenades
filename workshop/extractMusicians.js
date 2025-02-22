// FULLY WORKING

const fs = require("fs").promises;
const path = require("path");

const sourceFolder = "./htmlPages/musiciansPages";

const destinationFolder = "./extractedJSON/musicians";
const destinationFile = "./extractedJSON/musiciansData.json";

const metadataSection = { startStr: '{"@context":', endStr: "</script>" };
const musicianId = { startStr: '"@id":"http://pacser.org/performers/', endStr: '/","url":' };

const mainSection = { startStr: "<main", endStr: "</main>" };
const musicianName = { startStr: "<h1>", endStr: "</h1>" };
const dates = { startStr: '<span class="years">(', endStr: ")</span>" };
const website = { startStr: '<a href="', endStr: '" class="website">' };
const photo = { startStr: '},"thumbnailUrl":"', endStr: '","datePublished"' };
const bio = { startStr: "</h1>", midStr: "</span>", endStr: "<!--" };
const bioNoWebsite = { startStr: "<a href", midStr: "</a>", endStr: "<!--" };

function writeToFile(file, content) {
  fs.writeFile(file, JSON.stringify(content, null, 2));
}

function makeRegex(input) {
  const { startStr, endStr } = input;
  return new RegExp(`${startStr}([\\s\\S]*?)${endStr}`, "g");
}

// looks for start and end but returns between mid and end only
function makeRegexWithMiddle(input) {
  const { startStr, midStr, endStr } = input;
  return new RegExp(`${startStr}[\\s\\S]*?${midStr}([\\s\\S]*?)${endStr}`, "g");
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

async function processBio(str) {
  try {
    if (!str) {
      return str;
    }

    if (!str.includes("<p>")) {
      return "";
    }

    if (str.includes("<a href") && str.includes("<p>")) {
      return str.slice(str.indexOf("<p>"));
    }

    if (str.includes("</span><p>") && str.includes("<p>")) {
      return str.slice(str.indexOf("<p>"));
    }

    return str;
  } catch (err) {
    console.error(`Error in processBio:`, err);
    return "";
  }
}

async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    // console.log("processFile started");
    let finalResultArr = {};

    const musicianIdData = extractMatches([content], makeRegex(musicianId))[0].replace(/-./g, (x) => x[1].toUpperCase());
    const mainSectionData = extractMatches([content], makeRegex(mainSection));
    const musicianNameData = extractMatches([mainSectionData], makeRegex(musicianName))[0];
    const datesData = extractMatches([mainSectionData], makeRegex(dates));
    const websiteData = extractMatches([mainSectionData], makeRegex(website));
    const photoData = extractMatches([content], makeRegex(photo));
    const bioData = extractMatches([content], makeRegex(bio));
    const bioOnly = await processBio(bioData[0]);

    const splitDates = datesData[0] ? datesData[0].slice(1, -1).split(" – ") : "";
    const splitName = musicianNameData.split(" ");
    const lastName = splitName.pop();
    const firstName = splitName.join(" ");

    // console.log(" ");
    // console.log(musicianIdData);
    // console.log(bioData);
    // console.log(bioOnly);
    // console.log(musicianNameData);
    // console.log(splitDates);
    // console.log(websiteData);
    // console.log(photoData);
    // console.log(bioData);
    // console.log(bioWithoutWebsite);

    let musician = {
      [musicianIdData]: {
        id: musicianIdData,
        fullName: musicianNameData.replace("&amp;", "&"),
        firstName: firstName.replace("&amp;", "&"),
        lastName: lastName,
        born: splitDates[0] ? splitDates[0] : "",
        died: splitDates[1] ? splitDates[1] : "",
        website: websiteData[0] ? websiteData[0] : "",
        photo: photoData[0] ? `/photos/${musicianIdData}.jpg` : "",
        bio: bioData[0] ? bioOnly.replace("&amp;", "&") : "",
      },
    };

    // console.log(musician);

    finalResultArr = { ...finalResultArr, ...musician };

    return finalResultArr;
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
          results = { ...results, ...stuff };
        }); // Recurse into subdirectory
      } else if (entry.isFile()) {
        const extractedFromFile = await processFile(fullPath);
        // console.log(extractedFromFile);
        results = { ...results, ...extractedFromFile };
        // console.log(results);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
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
  writeToFile(destinationFile, data);
  for (const [key, value] of Object.entries(data)) {
    const concert = {
      [key]: value,
    };
    console.log(concert);
    writeToFile(`${destinationFolder}/${key}.json`, concert);
  }
});
