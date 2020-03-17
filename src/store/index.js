import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {
  stringCleaner,
  arrayCreator,
  arrayCleaner,
  wordCounter
} from "./helpers";

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
          this.state.infoActive = {
            state: false,
            amount: null
          };
          this.state.text = "File is empty :(";
          return;
        }
      } catch (e) {
        console.log(e.error);
      }

      const cleanString = stringCleaner(this.state.string);
      const arrayOfWords = arrayCreator(cleanString);
      const cleanArrayOfWords = arrayCleaner(arrayOfWords);
      const highestCount = wordCounter(cleanArrayOfWords);

      //The function below updates state.
      //1. I chose to make it an IFFE instead of breaking it out because it is so linked to state-management and has a low reusability.
      //2. I personally prefer a named function for readability but in this situation an anonymous arrow function binds this in a preferred way.
      (() => {
        if (highestCount.length === 1) {
          this.state.infoActive = {
            state: false,
            amount: 1
          };
          this.state.text = this.state.originalText.replace(
            new RegExp("\\b" + highestCount[0] + "\\b", "gi"),
            " foo" + highestCount[0] + "bar "
          );
        } else {
          this.state.infoActive = {
            state: true,
            amount: highestCount.length
          };

          this.state.text = this.state.originalText;
          highestCount.forEach(word => {
            this.state.text = this.state.text.replace(
              new RegExp("\\b" + word + "\\b", "gi"),
              " foo" + word + "bar "
            );
          });
        }
      })();

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
