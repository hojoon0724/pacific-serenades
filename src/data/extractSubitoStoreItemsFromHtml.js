import fs from "fs/promises";

const destinationFolder = "./subitoStore";
const readFile = "./subitoLinks.html";
const writeFile = `${destinationFolder}/subitoStoreItems.json`;

const itemRegex = {
  startStr: '<li class="product type-product',
  endStr: "</li>",
};

function makeRegex(input) {
  const { startStr, endStr } = input;
  const regex = new RegExp(`(${startStr}[\\s\\S]*?${endStr})`, "g");
  return regex;
}

function makeRegexExcludeMatchString(input) {
  const { startStr, endStr } = input;
  const regex = new RegExp(`${startStr}([\\s\\S]*?)${endStr}`, "g");
  return regex;
}

function makeRegexStartStringToEndExcludeMatch(input) {
  const { startStr, endStr } = input;
  const regex = new RegExp(`${startStr}([\\s\\S]*?)$`, "g");

  return regex;
}

function extractMatches(readFile, regex) {
  const matches = [];
  let match;
  while ((match = regex.exec(readFile)) !== null) {
    matches.push(match[1].trim()); // Add the matched content to results
  }
  // console.log(matches);
  return matches;
}

async function processFile(filePath) {
  const dataArrayToWrite = [];

  try {
    const rawData = await fs.readFile(filePath, "utf-8");
    const matchingData = extractMatches(rawData, makeRegex(itemRegex));
    console.log(`There are ${matchingData.length} matches`);

    matchingData.forEach((item, index) => {
      const storeLink = extractMatches(item, makeRegexExcludeMatchString({ startStr: 'class=\"woocommerce-image__wrapper\"><a href=\"', endStr: '\" title=\"' }));
      const title = extractMatches(item, makeRegexExcludeMatchString({ startStr: '\" title=\"', endStr: '\" class=\"woocommerce-LoopProduct-link woocommerce-loop-product__link\"><div class=\"' }));
      const composer = extractMatches(item, makeRegexExcludeMatchString({ startStr: '\" title=\"', endStr: ":" }));
      const itemData = {
        storeLink: storeLink[0],
        title: title[0].replace("&amp;", "&"),
        title: extractMatches(title[0].replace("&amp;", "&"), makeRegexStartStringToEndExcludeMatch({ startStr: ": ", endStr: "" })),
        composer: composer[0],
      };
      dataArrayToWrite.push(itemData);
    });
  } catch (error) {
    console.error("Error reading file:", error);
  }

  dataArrayToWrite.sort((a, b) => {
    if (a.composer === b.composer) {
      return String(a.title).localeCompare(String(b.title));
    }
    return a.composer.localeCompare(b.composer);
  });
  console.log(`${dataArrayToWrite.length} items extracted and sorted`);

  const jsonData = JSON.stringify(dataArrayToWrite, null, 2);
  await fs.writeFile(writeFile, jsonData);
  console.log("Data written to file:", writeFile);
}

processFile(readFile);
