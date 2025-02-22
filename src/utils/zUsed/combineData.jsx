import fs from 'fs';
import path from 'path';

export function importJsonFromFolder(folderPath) {
  const jsonFiles = fs.readdirSync(folderPath).filter(file => path.extname(file) === '.json');

  const jsonData = {};

  jsonFiles.forEach(file => {
    const filePath = path.join(folderPath, file);
    const fileContent = fs.readFileSync(filePath);
    const parsedData = JSON.parse(fileContent);

    const key = path.basename(file, '.json');
    jsonData[key] = parsedData;
  });

  return jsonData;
}
