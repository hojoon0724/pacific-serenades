const fs = require("fs").promises;
const path = require("path");

const sourceFile = "./extractedJSON/concertsData.json";
const venuesFile = "./extractedJSON/venues.json";
const newFile = "./extractedJSON/concertDataWithVenueID.json";

function writeToFile(file, content) {
  fs.writeFile(file, JSON.stringify(content, null, 2));
}

async function readFullList(sourcePath, venuePath) {
  let result = [];
  let processedData = {};
  try {
    const sourceData = await fs.readFile(sourcePath, "utf-8");
    const venueData = await fs.readFile(venuePath, "utf-8");
    const venueArr = JSON.parse(venueData);

    // console.log(sourceData);

    for (const [key, value] of Object.entries(JSON.parse(sourceData))) {
      let venueDataWithId = [];
      value.dates.forEach((date) => {
        if (date.venue.length !== 0) {
          let match = false;
          const slicedVenueStr = date.venue.slice(8);
          venueArr.forEach((venue) => {
            if (venue.str.includes(slicedVenueStr)) {
              match = true;
              // console.log(`match found: ${date.venue} = ${venue.id}: ${venue.str}`);
              date = { ...date, venueId: venue.id };
              venueDataWithId.push(date);
              // } else {
              //   // console.log(`no match: ${date.venue}`);
              // }
            }
          });
        }
        value.dates = venueDataWithId;
        // console.log(venueDataWithId);
      });
      processedData = { ...processedData, [key]: value };
    }
  } catch (err) {
    console.log("error while reading file", err);
  }

  return processedData;
}

async function executeMatch() {
  let dataToBeWritten = await readFullList(sourceFile, venuesFile);
  // console.log(dataToBeWritten);
  return dataToBeWritten;
}

executeMatch().then((data) => {
  writeToFile(`${newFile}`, data);
});
