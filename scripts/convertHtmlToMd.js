import fs from "fs/promises";

const readFrom = "../src/data/worksData.json";
const writeTo = "../src/data/serving/worksData.json";

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

async function showAllFormattingOptions(data) {
  // list all formatting that appears in the data
  const formattingOptions = new Set();
  const regex = /<\/?([a-z][a-z0-9-]*)\b[^>]*\/?>/gi;
  let match;

  while ((match = regex.exec(data)) !== null) {
    formattingOptions.add(match[1]);
  }

  return Array.from(formattingOptions);
}

async function replaceHtmlFormattingWithMarkdown(data) {
  const replacementMap = {
    br: "\\n\\n",
    b: "**",
    strong: "**",
    i: "*",
    em: "*",
    u: "__",
  };
  // Convert paragraph boundaries first so they are preserved after stripping p tags.
  data = data.replace(/<\/p>(?:\\n|\s)*<p>/gi, "\\n\\n");
  // Remove any remaining paragraph wrapper tags.
  data = data.replace(/<\/?p[^>]*>/gi, "");

  // replace html formatting with markdown formatting
  for (const [htmlTag, markdown] of Object.entries(replacementMap)) {
    const regex = new RegExp(`</?${htmlTag}[^>]*>`, "gi");
    // replace other html tags with markdown formatting
    data = data.replace(regex, markdown);
  }

  // Collapse 3+ literal \n markers down to a double break.
  data = data.replace(/(?:\\n){3,}/g, "\\n\\n");
  return data;
}

async function main(readFromThisFile, writeToThisFile) {
  const data = await readFile(readFromThisFile);
  const convertedDataInMd = await replaceHtmlFormattingWithMarkdown(data);
  await fs.writeFile(writeToThisFile, convertedDataInMd, "utf-8");
  console.log(`Converted HTML to Markdown and saved to ${writeToThisFile}`);
}

main(readFrom, writeTo);
