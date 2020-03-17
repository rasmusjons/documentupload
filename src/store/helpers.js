const stringCleaner = string => {
  console.log("strin", string);
  const newString = string
    .replace(/ {1}|\r\n|\n|\r/gm, " ") //radbrytnigar whitespace tar jag nedan i array
    .replace(/_ /g, "") //underscore med mellanrum
    .replace(/[\W_]/g, " ") //alla tecken
    .toLowerCase();

  return newString;
};
//cleans up text inorder to find most frequent word
/* const cleanString = this.state.string
           .replace(/ {1}|\r\n|\n|\r/gm, " ") //radbrytnigar whitespace tar jag nedan i array
           .replace(/_ /g, "") //underscore med mellanrum
           .replace(/[\W_]/g, " ") //alla tecken
          .toLowerCase();
  
          */

const arrayCleaner = string => {
  const arrayOfWords = string.split(" ");
  const cleanArrayOfWords = arrayOfWords.filter(word => word != "");
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
//WORD COUNTER
// let singleWordCount = {};
// let maxCount = 1;
// for (var i = 0; i < cleanArrayOfWords.length; i++) {
//   var word = cleanArrayOfWords[i];

//   if (singleWordCount[word] == null) {
//     singleWordCount[word] = 1;
//   } else singleWordCount[word]++;

//   if (singleWordCount[word] > maxCount) {
//     this.state.highestCount = [word];
//     maxCount = singleWordCount[word];
//   } else if (singleWordCount[word] == maxCount) {
//     this.state.highestCount.push(word);
//     maxCount = singleWordCount[word];
//   }
// }

export { stringCleaner, arrayCleaner, wordCounter };
