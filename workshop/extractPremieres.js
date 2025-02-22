const fs = require("fs").promises;
const path = require("path");

const worksDatabase = "../src/data/worksData.json";
const sourceFolder = "./htmlPages/premieresPages";

const destinationFile = "./extractedJSON/premieres.json";

const seasonBlock = { startStr: 'class="sea', endStr: "<h2" };
const seasonNameBlock = { startStr: 'son">', endStr: " Season</" };
const workSectionBlock = { startStr: "<article>", endStr: "</article>" };
const workTitleArea = { startStr: "<h5>", endStr: "</h5>" };
const workId = { startStr: "/music/", endStr: "/index.html" };
const commissionBlock = { startStr: '"commission">', endStr: "</span>" };

function writeToFile(file, content) {
  fs.writeFile(file, JSON.stringify(content, null, 2));
}

function makeRegex(input) {
  const { startStr, endStr } = input;
  return new RegExp(`${startStr}([\\s\\S]*?)${endStr}`, "g");
}

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

async function processFile(filePath, comparisonFilePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const allWorksDatabase = await fs.readFile(comparisonFilePath, "utf-8");
    const worksParsed = JSON.parse(allWorksDatabase);
    let finalResultArr = {};

    // Extract the data portion
    const seasonSectionData = extractMatches([content], makeRegex(seasonBlock));
    const seasonNameData = extractMatches([seasonSectionData], makeRegex(seasonNameBlock));
    // console.log(seasonSectionData);
    seasonSectionData.forEach((season) => {
      const seasonNameData = extractMatches([season], makeRegex(seasonNameBlock))[0];

      const worksData = extractMatches([season], makeRegex(workSectionBlock));
      let worksArr = [];
      worksData.forEach((work) => {
        let commissionData = extractMatches([work], makeRegex(commissionBlock))[0];
        const workUrl = extractMatches([work], makeRegex(workId))[0];
        const workIdData = workUrl.replace(/-./g, (x) => x[1].toUpperCase());
        // worksParsed[workIdData] ? worksArr.push(workIdData) : console.log(`cannot find ${workIdData}`);
        // commissionData.length > 3 ? console.log(`${workIdData} has no commission data`) : console.log(`we got data`);
        // console.log(``);
        // console.log(workIdData);
        // console.log(commissionData.replace("&amp;", "&"));
        // console.log(worksParsed[workIdData].commissionedBy);
        // console.log(`----`);
        if (commissionData.replace("&amp;", "&") !== worksParsed[workIdData].commissionedBy) {
          console.log(workIdData);
          console.log(commissionData.replace("&amp;", "&"));
          console.log(worksParsed[workIdData].commissionedBy);
          console.log(`----`);
        }
        // console.log(workIdData, commissionData.length);
      });
      // let seasonObject = {
      //   [seasonNameData]: worksArr,
      // };
      // finalResultArr = { ...finalResultArr, ...seasonObject };
    });
    // writeToFile(destinationFile, finalResultArr);
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
  }
}

async function main(filePath, comparisonFilePath) {
  const data = await processFile(filePath, comparisonFilePath);
}

main("./htmlPages/premieresPages/premieres.html", worksDatabase);
