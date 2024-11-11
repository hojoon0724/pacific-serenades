const fs = require("fs").promises;
const path = require("path");

const metadataSection = { startStr: '{"@context":', endStr: "</script>" };
const fileName = { startStr: '"@id":"http://pacser.org/music/', endStr: '/","url":' };

const mainSection = { startStr: '<main class="main music" role="main">', endStr: "</main>" };
const workName = { startStr: "<h1>", endStr: "</h1>" };
const workYear = { startStr: '<span class="composed">Composed in ', endStr: "</span>" };
const workComposer = { startStr: '<span class="composer">', midStr: "/composers/", endStr: '/index.html">' };
const purchaseLink = { startStr: "<!-- Purchase links -->", midStr: '<a href="', endStr: '" class="button">' };

const videoBlock = { startStr: '<ul class="video-links">', endStr: "</ul>" };
const videoEntry = { startStr: "<li>", endStr: "</li>" };
const videoLabel = { startStr: '<span class="video-label">', endStr: "</span>" };
const videoUrl = { startStr: '<a href="', endStr: '" class="video-link">' };

const audioBlock = { startStr: '<ul class="audio-files">', endStr: "</ul>" };
const audioEntry = { startStr: "<li>", endStr: "</li>" };
const audioLabel = { startStr: '<span class="audio-label">', endStr: "</span>" };
const audioUrl = { startStr: '<a href="', midStr: "(?:[^\\/]*\\/){6}", endStr: '">' };

const descriptionSection = { startStr: "<!-- Description -->", endStr: "<!-- Video links -->" };

const sourceFolder = "./music";

const destinationFolder = "./allWorks";
const destinationFile = "./allWorks.json";

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

function writeToFile(file, content) {
  fs.writeFile(file, JSON.stringify(content, null, 2));
}

async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    // console.log("processFile started");
    let finalResultArr = {};

    const fileNameData = extractMatches([content], makeRegex(fileName));
    // Extract the data portion
    const mainSectionData = extractMatches([content], makeRegex(mainSection));
    const descriptionInHtml = extractMatches([mainSectionData], makeRegex(descriptionSection));
    const fileNameCamel = fileNameData[0].toLowerCase().replace(/-./g, (x) => x[1].toUpperCase());

    const workNameData = extractMatches([mainSectionData], makeRegex(workName));
    const workYearData = extractMatches([mainSectionData], makeRegex(workYear));
    const workComposerData = extractMatches([mainSectionData], makeRegexWithMiddle(workComposer));
    const workComposerId = workComposerData[0].toLowerCase().replace(/-./g, (x) => x[1].toUpperCase());
    const purchaseLinkData = extractMatches([mainSectionData], makeRegexWithMiddle(purchaseLink));

    const videoBlockData = extractMatches([mainSectionData], makeRegex(videoBlock));
    const videoEntryData = extractMatches([videoBlockData], makeRegex(videoEntry));

    let videoData = [];
    videoEntryData.forEach((entry) => {
      const videoUrlData = extractMatches([entry], makeRegex(videoUrl));
      const videoLabelData = extractMatches([entry], makeRegex(videoLabel));
      videoData.push([videoUrlData[0], videoLabelData[0]]);
    });

    const audioBlockData = extractMatches([mainSectionData], makeRegex(audioBlock));
    const audioEntryData = extractMatches([audioBlockData], makeRegex(audioEntry));

    let audioData = [];
    audioEntryData.forEach((entry) => {
      const audioUrlData = extractMatches([entry], makeRegexWithMiddle(audioUrl));
      const audioLabelData = extractMatches([entry], makeRegex(audioLabel));
      audioData.push([audioUrlData[0], audioLabelData[0]]);
    });

    // console.log(" ");
    // console.log(fileNameCamel);
    // console.log(workNameData);
    // console.log(workYearData);
    // console.log(workComposerData);
    // console.log(purchaseLinkData);
    // console.log(videoEntryData);
    // console.log(videoData);
    // console.log(audioData);

    let work = {
      [fileNameCamel]: {
        id: fileNameCamel,
        workName: workNameData[0] ? workNameData[0] : "",
        workYear: workYearData[0] ? workYearData[0] : "",
        workComposer: workComposerId,
        purchaseLink: purchaseLinkData[0] ? purchaseLinkData[0] : "",
        video: videoData,
        audio: audioData,
        description: descriptionInHtml[0] ? descriptionInHtml[0] : "",
      },
    };

    // console.log(work);

    finalResultArr = { ...finalResultArr, ...work };

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
  console.log("dataToBeWritten", dataToBeWritten);
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
