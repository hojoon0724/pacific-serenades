const fs = require("fs").promises;
const path = require("path");

const mainSection = { startStr: "", endStr: "" };
const workName = { startStr: "", endStr: "" };
const workYear = { startStr: "", endStr: "" };
const workComposer = { startStr: "", endStr: "" };
const purchaseLink = { startStr: "", endStr: "" };
const videoLinks = { startStr: "", endStr: "" };
const audioLinks = { startStr: "", endStr: "" };
const dataName7 = { startStr: "", endStr: "" };

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
    let finalResultArr = {};

    // Extract the data portion
    const dataSection = extractMatches([content], makeRegex(relevantData));
    const concertTitle = extractMatches([dataSection], makeRegex(concertTitleBlock));
    // console.log(concertTitle);

    const dateLocationSection = extractMatches([dataSection], makeRegex(concertDateAndLocationSection));
    const oneDateLocationBlock = extractMatches([dateLocationSection], makeRegex(oneConcertDateAndLocation));
    let locationArr = [];
    oneDateLocationBlock.forEach((item) => {
      item.includes('<a href="')
        ? locationArr.push({
            day: new Date(`${extractMatches([item], makeRegex(concertDay))[0]}, ${convertTo24Hours(extractMatches([item], makeRegex(concertTime))[0])}`),
            time: convertTo24Hours(extractMatches([item], makeRegex(concertTime))[0]),
            venue: extractMatches([item], makeRegexWithMiddle(concertVenueWithUrl))[0],
          })
        : locationArr.push({
            day: new Date(`${extractMatches([item], makeRegex(concertDay))[0]}, ${convertTo24Hours(extractMatches([item], makeRegex(concertTime))[0])}`),
            time: convertTo24Hours(extractMatches([item], makeRegex(concertTime))[0]),
            venue: extractMatches([item], makeRegex(concertVenue))[0],
          });
    });

    const programBlock = extractMatches([dataSection], makeRegex(programDataBlock));
    // console.log(programBlock);
    const oneWorkBlock = extractMatches([programBlock], makeRegex(pieceBlock));
    // console.log(oneWorkBlock);

    let worksArr = [];
    oneWorkBlock.forEach((item) => {
      // console.log(item);
      item.includes("<a href")
        ? worksArr.push({
            workName: extractMatches([item], makeRegex(workNameBlock))[0],
            workYear: extractMatches([item], makeRegex(workYearBlock))[0] ? extractMatches([item], makeRegex(workYearBlock))[0] : "",
            workComposer: extractMatches([item], makeRegex(workComposerBlock))[0]
              .toLowerCase()
              .replace(/-./g, (x) => x[1].toUpperCase()),
            workInstrumentation: extractMatches([item], makeRegex(workInstrumentationBlock))[0],
          })
        : worksArr.push({
            workName: extractMatches([item], makeRegex(workNameBlock))[0],
            workYear: extractMatches([item], makeRegex(workYearBlock))[0] ? extractMatches([item], makeRegex(workYearBlock))[0] : "",
            workComposer: extractMatches([item], makeRegex(workComposerBlock))[0],
            workInstrumentation: extractMatches([item], makeRegex(workInstrumentationBlock))[0],
          });
    });

    const performersBlock = extractMatches([dataSection], makeRegex(musicianTopBlock));
    const oneMusicianBlock = extractMatches([performersBlock], makeRegex(musicianBlock));

    let musiciansArr = [];
    oneMusicianBlock.forEach((item) => {
      musiciansArr.push(
        extractMatches([item], makeRegex(nameBlock))[0]
          .toLowerCase()
          .replace(/-./g, (x) => x[1].toUpperCase())
      );
    });
    // console.log(musiciansArr);

    const fileName = extractMatches([filePath], makeRegex(fileNameFromPath))[0];
    const fileCamel = fileName ? fileName.replace(/-./g, (x) => x[1].toUpperCase()) : "";

    let concert = {
      [fileCamel]: {
        concertTitle: concertTitle[0],
        dates: locationArr,
        program: worksArr,
        musicians: musiciansArr,
      },
    };

    // finalResultArr.push(concert);
    finalResultArr = { ...finalResultArr, ...concert };
    // console.dir(finalResultArr);

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
