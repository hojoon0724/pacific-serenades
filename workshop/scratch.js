const fs = require('fs');
const franzJosephHaydn = require('./franz-joseph-haydn.json');

const destinationFolder = './composersJson';

const personData = {
  nameArr: ['tanburi', 'cemil', 'bey'],
  firstName: 'tanburi cemil',
  lastName: 'bey',
  born: '1871',
  died: '1916',
};

function writeToFile(file, content) {
  fs.writeFileSync(file, JSON.stringify(content, null, 2));
}

writeToFile(`./${destinationFolder}/${personData.nameArr.join('-')}.json`, personData);

console.log(franzJosephHaydn.name);
