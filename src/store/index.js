import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    string: "",
    text: "",
    originalText: "",
    highestCount: [],
    spinner: false,
    infoActive: { state: false, amount: 0 }
  },
  mutations: {
    async get_Document() {
      this.state.spinner = true;
      try {
        const response = await axios.get("http://localhost:3000/documents");
        this.state.originalText = response.data;
        this.state.string = response.data;

        if (this.state.string.length === 0) {
          this.state.spinner = false;
          this.state.text = "File is empty :(";
          return;
        }
      } catch (e) {
        console.log(e.error);
      }
      //cleans up text inorder to find most frequent word
      const cleanString = this.state.string
        .replace(/ {1}|\r\n|\n|\r/gm, " ") //radbrytnigar whitespace tar jag nedan i array
        .replace(/_ /g, "") //underscore med mellanrum
        .replace(/[\W_]/g, " ") //alla tecken
        .toLowerCase();

      const arrayOfWords = cleanString.split(" ");
      const cleanArrayOfWords = arrayOfWords.filter(word => word != "");

      //WORD COUNTER
      let singleWordCount = {};
      let maxCount = 1;
      for (var i = 0; i < cleanArrayOfWords.length; i++) {
        var word = cleanArrayOfWords[i];

        if (singleWordCount[word] == null) {
          singleWordCount[word] = 1;
        } else singleWordCount[word]++;

        if (singleWordCount[word] > maxCount) {
          this.state.highestCount = [word];
          maxCount = singleWordCount[word];
        } else if (singleWordCount[word] == maxCount) {
          this.state.highestCount.push(word);
          maxCount = singleWordCount[word];
        }
      }

      //WORD REPLER

      if (this.state.highestCount.length === 1) {
        this.state.infoActive = {
          state: false,
          amount: 1
        };
        this.state.text = this.state.originalText.replace(
          new RegExp("\\b" + this.state.highestCount[0] + "\\b", "gi"),
          " foo" + this.state.highestCount[0] + "bar "
        );
      } else {
        this.state.infoActive = {
          state: true,
          amount: this.state.highestCount.length
        };

        this.state.text = this.state.originalText;
        this.state.highestCount.forEach(word => {
          this.state.text = this.state.text.replace(
            new RegExp("\\b" + word + "\\b", "gi"),
            " foo" + word + "bar "
          );
        });
      }
      this.state.spinner = false;
    }
  },
  actions: {
    getDocument: ({ commit }) => {
      console.log("action get DOC");
      commit("get_Document");
    },
    getStringCleaner: ({ commit }) => {
      console.log("action get srtingC");
      commit("string_Cleaner");
    }
  },
  getters: {
    text: state => {
      return state.text;
    },
    spinner: state => {
      return state.spinner;
    },
    infoActive: state => {
      return state.infoActive;
    }
  }
});
