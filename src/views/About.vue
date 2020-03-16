<template>
  <div>
    <h5 v-if="infoActive.state === true">
      The text has {{ infoActive.amount }} words that occur the same amount of
      times
    </h5>
    <p>{{ text }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async beforeMount() {
    try {
      const response = await axios.get("http://localhost:3000/documents");
      let untampered = response.data;
      let string = response.data;
      if (string.length === 0) {
        return (this.text = "File is empty :(");
      }

      string = string
        .replace(/ {1}|\r\n|\n|\r/gm, " ") //radbrytnigar whitespace tar jag nedan i array
        .replace(/_ /g, "") //underscore med mellanrum
        .replace(/[\W_]/g, " ") //alla tecken
        .toLowerCase();

      console.log(string);

      const stringArray = string.split(" ");
      const clean = stringArray.filter(word => word != "");
      console.log(clean);
      clean.length === 0 ? null : null;

      let singleWordCount = {},
        maxCount = 1,
        highestCount = [];

      for (var i = 0; i < clean.length; i++) {
        var word = clean[i];

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
      console.log(highestCount);

      if (highestCount.length === 1) {
        this.text = untampered.replace(
          new RegExp("\\b" + highestCount[0] + "\\b", "gi"),
          " foo" + highestCount[0] + "bar "
        );
      } else {
        this.infoActive = { state: true, amount: highestCount.length };

        this.text = untampered;
        highestCount.forEach(word => {
          this.text = this.text.replace(
            new RegExp("\\b" + word + "\\b", "gi"),
            " foo" + word + "bar "
          );
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      infoActive: { state: false, amount: 0 },
      text: "",
      array: ""
    };
  }
};
</script>
