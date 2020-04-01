import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {
  stringCleaner,
  stringCleanerKeepUpperCase,
  createArray,
  sanitizeEmptyValues,
  wordCounter
} from "./helpers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    responseString: "",
    text: "",
    originalText: "",
    spinner: false,
    infoActive: { state: false, amount: 0 },
    caseChecked: true,
    stats: { word: "", amount: 0 },
    fileUploadedStatus: false,
    emptyFile: false
  },
  mutations: {
    async GET_DOCUMENT() {
      this.state.spinner = true;
      try {
        const response = await axios.get("/documents");
        this.state.originalText = response.data;
        this.state.responseString = response.data;

        if (this.state.responseString.length === undefined) {
          throw new Error("Text length is undefined");
        }

        if (this.state.responseString.length === 0) {
          this.state.spinner = false;
          this.state.infoActive = {
            state: false,
            amount: null
          };
          this.state.text = "File is empty";
          this.state.fileUploadedStatus = true;
          this.state.emptyFile = true;
          return;
        }
      } catch (e) {
        console.log(e.error);
      }
      const cleanString =
        this.state.caseChecked === true
          ? stringCleanerKeepUpperCase(this.state.responseString)
          : stringCleaner(this.state.responseString);
      const arrayOfWords = createArray(cleanString);
      const cleanArrayOfWords = sanitizeEmptyValues(arrayOfWords);
      const wordCount = wordCounter(cleanArrayOfWords);
      this.state.stats = wordCount;

      const words = wordCount.word;

      //The function below updates state.
      //1. I chose to make it an IFFE instead of breaking it out because it is so linked to state-management and has a low reusability.
      //2. I personally prefer a named function for readability but in this situation an anonymous arrow function binds this in a preferred way.
      (() => {
        if (words.length === 1) {
          this.state.infoActive = {
            state: false,
            amount: 1
          };

          this.state.text = this.state.originalText.replace(
            new RegExp("\\b" + words[0] + "\\b", "gi"),
            " foo" + words[0] + "bar "
          );
        } else {
          this.state.infoActive = {
            state: true,
            amount: words.length
          };

          this.state.text = this.state.originalText;

          words.forEach(word => {
            this.state.text = this.state.text.replace(
              new RegExp("\\b" + word + "\\b", "gi"),
              " foo" + word + "bar "
            );
          });
        }
      })();

      this.state.emptyFile = false;
      this.state.spinner = false;
      this.state.fileUploadedStatus = true;
    },
    TOGGLE_CASE() {
      this.state.caseChecked = !this.state.caseChecked;
    }
  },
  actions: {
    getDocument: ({ commit }) => {
      commit("GET_DOCUMENT");
    },
    toggleCase: ({ commit }) => {
      commit("TOGGLE_CASE");
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
    },
    caseChecked: state => {
      return state.caseChecked;
    },
    getStats: state => {
      return state.stats;
    },
    getFileUploadedStatus: state => {
      return state.fileUploadedStatus;
    },
    getEmptyFile: state => {
      return state.emptyFile;
    }
  }
});
