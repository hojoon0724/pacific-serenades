const fs = require("fs").promises;
const path = require("path");

const sourceFolder = "./htmlPages/concertsPages";

const destinationFolder = "./extractedJSON/concerts";
const destinationFile = "./extractedJSON/concertsData.json";

/*

Things to extract
concertId
  from url, kebab to camel

year
  add later from season data

concertTitle
  <h1>[str here]</h1>

dates
  <ul class="venues">
    <li>[date str here], [venue str here]</li>
  </ul>

program
  <ul class="pieces">
    <li>[workName], [year], [composerId = url kebab to camel], [instrumentation string]</li>
  </ul>

musicians
  <ul class="musicians">
    <li>[musicianId = url kebab to camel</li>
  </ul>

*/

// relevantData
const relevantData = { startStr: 'role="main">', endStr: "</main>" };

// concertTitleBlock
const concertTitleBlock = { startStr: "<h1>", endStr: "</h1>" };

// date and location main block
const concertDateAndLocationSection = { startStr: '<ul class="venues">', endStr: "</ul>" };
// search within the date and location block
const oneConcertDateAndLocation = { startStr: "<li>", endStr: "</li>" };
// search within oneConcertDateAndLocation
const concertDay = { startStr: '<span class="day">', endStr: "</span>" };
const concertTime = { startStr: '<span class="time">', endStr: "</span>" };
const concertVenue = { startStr: '<span class="venue">', endStr: "</span>" };
const concertVenueWithUrl = { startStr: '<span class="venue">', midStr: '/index.html">', endStr: "</a>" };

// programDataBlock
const programDataBlock = { startStr: '<ul class="pieces">', endStr: "</ul>" };
// search within programDataBlock
const pieceBlock = { startStr: "<li>", endStr: "</li>" };
// search within pieceBlock
const workNameBlock = { startStr: '<span class="piece">', endStr: "<" };
const workYearBlock = { startStr: '<span class="year">', endStr: "</span>" };
//* workComposerBlock has midStr, use makeRegexMid
const workComposerBlock = { startStr: "/composers/", midStr: 'index.html">', endStr: "/index" };
const workInstrumentationBlock = { startStr: '<span class="instrumentation">', endStr: "</span>" };

const musicianTopBlock = { startStr: '<ul class="musicians">', endStr: "</ul>" };
// search musicianBlock within musicianTopBlock
const musicianBlock = { startStr: "<li>", endStr: "</li>" };
//search within musicianBlock
const nameBlock = { startStr: "/performers/", endStr: "/index.html" };
const instrumentBlock = { startStr: 'class="instrument">', endStr: "</span" };

const fileNameFromPath = { startStr: "/", endStr: "/index" };

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

function convertTo24Hours(str) {
  if (str.length < 10) {
    str = `0${str}`;
  }

  let add12 = 0;

  str.slice(6) === "p.m." ? (add12 = 12) : (add12 = 0);

  let hour = parseInt(str.slice(0, 2)) + add12;
  let minute = str.slice(3, 5);

  return `${hour}:${minute}`;
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
            date: new Date(`${extractMatches([item], makeRegex(concertDay))[0]}, ${convertTo24Hours(extractMatches([item], makeRegex(concertTime))[0])}`),
            time: convertTo24Hours(extractMatches([item], makeRegex(concertTime))[0]),
            venue: extractMatches([item], makeRegexWithMiddle(concertVenueWithUrl))[0].replace("&amp;", "&"),
          })
        : locationArr.push({
            date: new Date(`${extractMatches([item], makeRegex(concertDay))[0]}, ${convertTo24Hours(extractMatches([item], makeRegex(concertTime))[0])}`),
            time: convertTo24Hours(extractMatches([item], makeRegex(concertTime))[0]),
            venue: extractMatches([item], makeRegex(concertVenue))[0].replace("&amp;", "&"),
          });
    });

    // console.log(locationArr);

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
    // console.log(worksArr);

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

    const fileName = extractMatches([filePath], makeRegex(fileNameFromPath))[0].slice(14);
    // console.log(fileName);
    const fileCamel = fileName ? fileName.replace(/-./g, (x) => x[1].toUpperCase()) : "";
    // console.log(fileCamel);

    let concert = {
      [fileCamel]: {
        id: fileCamel,
        year: locationArr[0].date.getFullYear().toString(),
        concertTitle: concertTitle[0],
        dates: locationArr,
        program: worksArr,
        musicians: musiciansArr,
      },
    };
    // console.log(concert);
    // console.log(locationArr[0].date);

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
