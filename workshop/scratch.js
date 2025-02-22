const fs = require("fs");
const path = require("path");

const sourceFolder = "./concertsOld";
const sampleFile1 = "./sampleData/we-all-inhabit-this-small-planet/index.html";
const sampleFile2 = "./sampleData/weavers-of-delight/index.html";
const destinationFolder = "./concertsNew";

const topBlock = { startStr: '<ul class="musicians">', endStr: "</ul>" };
const musicianBlock = { startStr: "<li>", endStr: "</li>" };
const nameBlock = { startStr: 'index.html">', endStr: "</a>" };

async function readDataFromFile(path) {
  console.log(`read shit from ${file}`);
  return fs.readFile(path, "utf-8");
}

function makeRegex(input) {
  const { startStr, endStr } = input;
  return new RegExp(`${startStr}([\\s\\S]*?)${endStr}`, "g");
}

function getSubsetData(data, regex) {
  const matches = [];
  let match;
  try {
    while ((match = regex.exec(data)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  } catch (err) {
    console.log(err);
  }
}

async function handleData(files) {
  try {
    const rawDataArray = await Promise.all(files.map(readDataFromFile));

    const processedData = rawDataArray.map((data) => {
      let step1Result = getSubsetData(data, makeRegex(topBlock));
      console.log(step1Result);
      // let step2Result = processDataStep2(step1Result);
      // return step2Result;
    });

    return processedData;
  } catch (error) {
    console.error("Error processing data:", error);
    throw error;
  }
}

handleData([sampleFile1, sampleFile2]);
