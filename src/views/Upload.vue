<template>
  <div>
    <div
      class="dropZone"
      :class="{ draggClass: dragging }"
      @dragover.prevent
      @drop.stop.prevent="onDrop"
      @drop="dragging = false"
      @dragleave="dragging = false"
      @dragover="dragging = true"
    >
      <p v-if="headline">Drag & Drop a document</p>

      <transition name="fade" mode="out-in">
        <p v-if="success">Uploading Done! Upload again?</p>
        <div v-if="fail">
          <p>File format is not recognized! Try again?</p>
          <p>Supported formats are:</p>
          <ul v-for="format in supportedFormats" :key="format.index">
            <li>{{ format }}</li>
          </ul>
        </div>
      </transition>
      <b-spinner
        class="spinner"
        type="grow"
        label="Loading..."
        v-if="spinner"
      ></b-spinner>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      file: "",
      dragging: false,
      headline: true,
      success: false,
      fail: false,
      spinner: false,
      supportedFormats: ["rtf", "txt", "md", "file", "doc", "docx"]
    };
  },

  methods: {
    drag() {
      console.log(this.dragging);
    },
    send() {
      this.$root.$emit("mess");
    },
    async onDrop(event) {
      this.spinner = true;
      this.file = event.dataTransfer.files[0];
      const formData = new FormData();
      formData.append("document", this.file);

      try {
        const response = await axios.post(
          "http://localhost:3000/documents",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        this.spinner = false;
        this.success = true;
        this.fail = false;
        this.headline = false;
        this.send();
        this.getDocument();
        console.log("SUCCESS!!", response);
      } catch (e) {
        console.log(e);
        this.success = false;
        this.fail = true;
        this.headline = false;
        this.spinner = false;
      }
    },

    /*
        Handles a change on the file upload
      */

    ...mapActions(["getDocument"])
  }
};
</script>

<style>
.spinner {
  display: inline;
}
.dropZone {
  min-height: 200px;
  width: 70%;
  margin: auto;
  background: mistyrose;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
  outline: 2px dashed black;
  outline-offset: -5px;
}
.draggClass {
  background-color: white;

  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
  outline: 2px dashed black;
  outline-offset: -10px;
}

p {
  text-align: center;
}

li {
  list-style-type: none;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.2s;
}
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0.2s;
}
</style>
