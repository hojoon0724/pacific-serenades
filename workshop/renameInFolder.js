const fs = require('fs');
const path = require('path');

const targetFolder = './public/photos';

function renameKebabToCamelInFolder(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach(file => {
      const oldPath = path.join(dir, file.name);
      const newFileName = file.name.toLowerCase().replace(/-./g, x => x[1].toUpperCase());
      const newPath = path.join(dir, newFileName);
      console.log(newPath);

      fs.rename(oldPath, newPath, err => {
        if (err) {
          console.log(`error renaming ${oldPath} - ${err}`);
        } else console.log(`renamed ${oldPath} to ${newPath}`);
      });
    });
  });
}

renameKebabToCamelInFolder(targetFolder);
