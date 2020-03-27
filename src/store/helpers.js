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

const createArray = string => {
  const arrayOfWords = string.split(" ");
  return arrayOfWords;
};

const sanitizeEmptyValues = array => {
  const cleanArrayOfWords = array.filter(word => word != "");
  return cleanArrayOfWords;
};

// Takes an array of words and iterates over the words in the array, increasing the singleWordCount if a word reoccurs
// Returns an object with an array of most frequent word/s and a numerical maxCount.
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
      maxCount = singleWordCount[word];
      highestCount.push(word);
    }
  }
  return { word: highestCount, maxCount };
};

module.exports = {
  stringCleaner,
  stringCleanerKeepUpperCase,
  createArray,
  sanitizeEmptyValues,
  wordCounter
};
