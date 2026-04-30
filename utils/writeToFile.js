import fs from "fs/promises";
import path from "path";

export async function writeToFile(file, content) {
  try {
    await fs.writeFile(file, JSON.stringify(content, null, 2));
    console.log(`Data written to ${file}`);
  } catch (error) {
    console.error("Error writing file:", error);
  }
}