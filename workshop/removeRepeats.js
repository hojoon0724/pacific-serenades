const fs = require("fs");

const venues = "./venues.json";

function writeToFile(file, content) {
  fs.writeFileSync(file, JSON.stringify(content, null, 2));
}

function removeDuplicates(arr) {
  let newArr = [];
  arr.forEach((item) => {
    if (!newArr.includes(item)) {
      newArr.push(item);
    }
  });
  console.log(`final`, newArr);
}

fs.readFile(venues, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  try {
    const venues = JSON.parse(data);
    const uniqueVenues = removeDuplicates(venues);
    console.log(uniqueVenues);
  } catch (parseError) {
    console.log(parseError);
  }
});

// removeDuplicates(venues);
