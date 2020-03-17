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
      <input class="fileupLoad" type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
      <label class="filepLoadLabel" for="file">
        <span v-if="headline">
          <b-icon-upload></b-icon-upload>

          <span>Choose a file</span>
          {{ " " }}
          <span>or drag it here.</span>
        </span>
      </label>

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
      <b-spinner class="spinner" type="grow" label="Loading..." v-if="spinner"></b-spinner>
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
    async upload(refs) {
      this.file = refs;
      this.spinner = true;

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
    async handleFileUpload() {
      this.upload(this.$refs.file.files[0]);
    },
    drag() {
      console.log(this.dragging);
    },

    async onDrop(event) {
      this.upload(event.dataTransfer.files[0]);
    },
    ...mapActions(["getDocument"])
  }
};
</script>

<style>
.b-icon.bi {
  display: block !important;
  margin: auto;
  width: 70px;
  height: 70px;
}
.spinner {
  display: inline;
}

.fileupLoad {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.filepLoadLabel {
  padding-top: 40px;
  width: 100%;
  height: 210px;
  position: left;
  cursor: pointer;
  z-index: -1;
}

.dropZone {
  min-height: 200px;
  width: 70%;
  margin: auto;
  background: #bedce0;
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
