<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="12">
          <!-- Ignore Case button -->
          <button class="btn btn-info" @click="toggleCase(), getDocument()">
            Ignore case?
            <span v-if="caseCheck === true">Yes!</span>
            <span v-else>No</span>
          </button>

          <hr />

          <!-- Text-container headline for 1 word-->
          <div v-if="!spinnerStore && stats.word.length <= 1">
            <h4 v-if="!fileUploadedStatus">Your text will be shown below after upload</h4>

            <h4 v-if="fileUploadedStatus && !emptyFileStatus">
              The most common word is
              <span class="mostCommon">{{ stats.word[0] }}</span> which occurs
              <span class="mostCommon">{{ stats.maxCount }}</span> times
            </h4>
          </div>

          <!-- Text-container headlines for 2 or more words-->
          <div class="textContainerHeadline" v-if="!spinnerStore && stats.word.length > 1">
            <h4 v-if="!emptyFileStatus">
              The most common words are
              <span v-for="word in stats.word" :key="word.index">
                {{ word }}
                {{ " " }}
              </span>
              which occur
              <span>{{ stats.maxCount }}</span>
              times
            </h4>
          </div>
          <h5 v-if="infoActiveStore.state === true">
            The text has {{ infoActiveStore.amount }} words that occur the same
            amount of times
          </h5>

          <!-- Text-container-->
          <div class="textContainer">
            <b-spinner type="grow" label="Loading..." v-if="spinnerStore"></b-spinner>

            <div v-if="!fileUploadedStatus">
              <strong>No file is uploaded</strong>
              <app-empty-balloon class="balloon"></app-empty-balloon>
              <p>
                Please upload file above to display text and find most common
                word.
              </p>
            </div>
            <p class="textUploaded">{{ textStore }}</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import EmptyBalloon from "./EmptyBalloon";
export default {
  data() {
    return {
      checked: true,
      spinner: true,
      statsFromStore: {}
    };
  },
  methods: {
    ...mapActions(["getDocument", "toggleCase"])
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
    },
    fileUploadedStatus() {
      return this.$store.getters.getFileUploadedStatus;
    },
    emptyFileStatus() {
      return this.$store.getters.getEmptyFile;
    }
  },
  components: {
    appEmptyBalloon: EmptyBalloon
  }
};
</script>

<style>
/*  Buttons */
.btn-info {
  margin-top: 30px;
  opacity: 0.7;
  background-color: #6abbc9;
}

/*  Text-container */
.textContainerHeadline,
span {
  font-weight: 900;
}

.textContainer {
  background-color: white;
  min-height: 200px;
  margin: auto;
  width: 70%;
  border-radius: 2px;
  padding: 40px;
  -webkit-box-shadow: 1px 3px 21px -6px rgba(176, 176, 176, 1);
  -moz-box-shadow: 1px 3px 21px -6px rgba(176, 176, 176, 1);
  box-shadow: 1px 3px 21px -6px rgba(176, 176, 176, 1);
  mask-image: radial-gradient(
    circle at 1.5rem 1.5rem,
    transparent 1.5rem,
    gold 0
  );
  mask-position: -1.5rem -1.5rem;
  mask-repeat: repeat;
}

.textContainerHeadline,
h4 {
  padding: 15px;
}

/* Text-conatiner font for faster rendering */
.textUploaded {
  font-family: "Geneva";
  text-align: left;
}

/* Image before upload */
.balloon {
  margin: auto;
  width: 30%;
  padding: 10px;
}
</style>
