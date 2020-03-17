const stringCleaner = string => {
  const newString = string
    .replace(/ {1}|\r\n|\n|\r/gm, " ")
    .replace(/_ /g, "")
    .replace(/[\W_]/g, " ")
    .toLowerCase();

  return newString;
};
const stringCleanerKeepUpperCase = string => {
  const newString = string
    .replace(/ {1}|\r\n|\n|\r/gm, " ")
    .replace(/_ /g, "")
    .replace(/[\W_]/g, " ");
  return newString;
};

const arrayCreator = string => {
  const arrayOfWords = string.split(" ");
  return arrayOfWords;
};

const arrayCleaner = array => {
  const cleanArrayOfWords = array.filter(word => word != "");
  return cleanArrayOfWords;
};

const wordCounter = array => {
  let singleWordCount = {};
  let maxCount = 1;
  let highestCount = [];

  for (let i = 0; i < array.length; i++) {
    let word = array[i];

    if (singleWordCount[word] == null) {
      singleWordCount[word] = 1;
    } else singleWordCount[word]++;

    if (singleWordCount[word] > maxCount) {
      highestCount = [word];
      maxCount = singleWordCount[word];
    } else if (singleWordCount[word] == maxCount) {
      highestCount.push(word);
      maxCount = singleWordCount[word];
    }
  }
  return highestCount;
};

module.exports = {
  stringCleaner,
  stringCleanerKeepUpperCase,
  arrayCreator,
  arrayCleaner,
  wordCounter
};
