<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="12">
          <button class="btn btn-info" @click="toogleCase(), getDocument()">
            Ignore case?
            <span v-if="caseCheck === true">Yes!</span>
            <span v-else>No</span>
          </button>
          <hr />

          <div v-if="!spinnerStore && stats.word.length <= 1">
            <h4>
              The most common word is
              <span class="mostCommon">{{ stats.word[0] }}</span> which occur
              <span class="mostCommon">{{ stats.maxCount }}</span> times
            </h4>
          </div>
          <div v-if="!spinnerStore && stats.word.length > 1">
            <h4>
              The most common words are
              <span
                class="mostCommon"
                v-for="word in stats.word"
                :key="word.index"
              >
                {{ word }}
                {{ " " }}
              </span>
              which occur
              <span class="mostCommon">{{ stats.maxCount }}</span>
              times
            </h4>
          </div>
          <h5 v-if="infoActiveStore.state === true">
            The text has {{ infoActiveStore.amount }} words that occur the same
            amount of times
          </h5>
          <div class="textContainer">
            <b-spinner type="grow" label="Loading..." v-if="spinnerStore"></b-spinner>

            <p>{{ textStore }}</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.getDocument(this.checked);

    // try {
    //   const response = await axios.get("http://localhost:3000/documents");
    //   console.log(response);
    //   this.originalText = response.data;
    //   string = response.data;
    //   if (string.length === 0) {
    //     this.spinner = false;
    //     this.text = "File is empty :(";
    //     return;
    //   }
    // } catch (e) {
    //   console.log(e.error);
    // }
    // let string = this.getDocument();
    // //cleans up text inorder to find most frequent word
    // const cleanString = this.stringCleaner(string);
    // const arrayOfWords = cleanString.split(" ");
    // const cleanArrayOfWords = arrayOfWords.filter(word => word != "");
    // this.findMostFrequent(cleanArrayOfWords);
    // this.rewriteText();
    // this.spinner = false;
  },
  data() {
    return {
      checked: true,
      // infoActive: { state: false, amount: 0 },
      // text: "",
      // array: "",
      spinner: true,
      statsFromStore: {}
      // highestCount: [],
      // originalText: ""
    };
  },
  methods: {
    ...mapActions(["getDocument", "toogleCase"]),

    rewriteText() {
      if (this.highestCount.length === 1) {
        this.text = this.originalText.replace(
          new RegExp("\\b" + this.highestCount[0] + "\\b", "gi"),
          " foo" + this.highestCount[0] + "bar "
        );
      } else {
        this.infoActive = { state: true, amount: this.highestCount.length };

        this.text = this.originalText;
        this.highestCount.forEach(word => {
          this.text = this.text.replace(
            new RegExp("\\b" + word + "\\b", "gi"),
            " foo" + word + "bar "
          );
        });
      }
      //   if (this.highestCount.length === 1) {
      //     this.text = text.replace(
      //       new RegExp("\\b" + this.highestCount[0] + "\\b", "gi"),
      //       " foo" + array[0] + "bar "
      //     );
      //   } else {
      //     this.infoActive = { state: true, amount: array.length };

      //     this.text = text;
      //     this.highestCount.forEach(word => {
      //       this.text = this.text.replace(
      //         new RegExp("\\b" + word + "\\b", "gi"),
      //         " foo" + word + "bar "
      //       );
      //     });
      //   }
    },
    findMostFrequent(array) {
      let singleWordCount = {};
      let maxCount = 1;
      for (var i = 0; i < array.length; i++) {
        var word = array[i];

        if (singleWordCount[word] == null) {
          singleWordCount[word] = 1;
        } else singleWordCount[word]++;

        if (singleWordCount[word] > maxCount) {
          this.highestCount = [word];
          maxCount = singleWordCount[word];
        } else if (singleWordCount[word] == maxCount) {
          this.highestCount.push(word);
          maxCount = singleWordCount[word];
        }
      }
    },
    stringCleaner(string) {
      return (string = string
        .replace(/ {1}|\r\n|\n|\r/gm, " ") //radbrytnigar whitespace tar jag nedan i array
        .replace(/_ /g, "") //underscore med mellanrum
        .replace(/[\W_]/g, " ") //alla tecken
        .toLowerCase());
    }
  },
  computed: {
    textComputed() {
      return this.text;
    },
    textStore() {
      return this.$store.getters.text;
    },
    spinnerStore() {
      return this.$store.getters.spinner;
    },
    infoActiveStore() {
      return this.$store.getters.infoActive;
    },
    caseCheck() {
      return this.$store.getters.caseChecked;
    },
    stats() {
      return this.$store.getters.getStats;
    }
  }
};
</script>

<style>
h4 {
  padding: 15px;
}

.btn-info {
  margin-top: 30px;
  opacity: 0.7;
}

.mostCommon {
  font-weight: 900;
}

.textContainer {
  background-color: white;
  border-radius: 2px;
  padding: 40px;
  -webkit-box-shadow: 1px 3px 21px -6px rgba(176, 176, 176, 1);
  -moz-box-shadow: 1px 3px 21px -6px rgba(176, 176, 176, 1);
  box-shadow: 1px 3px 21px -6px rgba(176, 176, 176, 1);
}
</style>
