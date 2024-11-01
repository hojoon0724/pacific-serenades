const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');

const targetFolder = '../data/composers';

function writeToFile(file, content) {
  fs.writeFileSync(file, JSON.stringify(content, null, 2));
}

function rewriteComposerPhotoFileName(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach(file => {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        rewriteComposerPhotoFileName(fullPath);
      } else {
        try {
          const fileContent = fs.readFileSync(fullPath, 'utf-8');
          const jsonObject = JSON.parse(fileContent);
          const newPhotoName = jsonObject.photo.toLowerCase().replace(/-./g, x => x[1].toUpperCase());
          jsonObject.photo = newPhotoName;

          writeToFile(fullPath, jsonObject);
        } catch (parseErr) {
          console.log('error');
        }
        // console.log(parsedData);
        // const fileNameKebab = dir.replace(/.*\//, '');
        // const fileName = fileNameKebab.replace(/-./g, x => x[1].toUpperCase());

        // Promise.all([
        //   getComposerName(fullPath),
        //   getComposerDates(fullPath),
        //   getComposerPhoto(fullPath),
        //   getComposerBio(fullPath),
        // ])
        //   .then(([composerName, composerDates, composerPhoto, composerBio]) => {
        //     const composerObject = {
        //       nameArr: composerName.nameArr,
        //       firstName: composerName.firstName,
        //       lastName: composerName.lastName,
        //       born: composerDates ? composerDates.born : '',
        //       died: composerDates ? composerDates.died : '',
        //       photo: composerPhoto ? composerPhoto : '',
        //       bio: composerBio ? composerBio[0] : '',
        //     };
        //     // console.log(composerObject);
        //     writeToFile(`./composersJSON/${fileName}.json`, composerObject);
        //   })
        //   .catch(err => {
        //     console.log('Error processing file:', err);
        //   });
      }
    });
  });
}

rewriteComposerPhotoFileName(targetFolder);
