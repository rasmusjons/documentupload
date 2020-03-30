<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="12">
          <!-- Dropzone -->
          <div
            class="dropZone"
            :class="{ draggEffect: dragging }"
            @dragover.prevent
            @drop.stop.prevent="onDrop"
            @drop="dragging = false"
            @dragleave="dragging = false"
            @dragover="dragging = true"
          >
            <!-- Hidden clickable file upload input -->
            <input
              class="hiddenFileupLoad"
              type="file"
              id="file"
              ref="file"
              v-on:change="handleFileUpload()"
            />

            <!-- Welcome message in drop-zone -->
            <label class="filepLoadLabel" for="file">
              <span v-if="headline">
                <b-icon-upload></b-icon-upload>
                <span class="bold">Choose a file</span>
                {{ " " }}
                <span>or drag it here.</span>
              </span>

              <!-- Result message in dropzone -->
              <transition name="fade" mode="out-in">
                <p v-if="success">
                  <span class="bold">Done!</span> Upload new document?
                </p>
                <div v-if="fail">
                  <p>File format is not recognized! Try again?</p>
                  <p>Supported formats are:</p>
                  <p
                    class="supportedFormats"
                    v-for="format in supportedFormats"
                    :key="format.index"
                  >{{ format }} {{ " " }}</p>
                </div>
              </transition>

              <!-- Loader. Displayed while loading -->
              <div class="spinner">
                <b-spinner type="grow" label="Loading..." v-if="spinner"></b-spinner>
              </div>
            </label>
          </div>
        </b-col>
      </b-row>
    </b-container>
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
      supportedFormats: ["rtf", "txt", "md", "file"]
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
        this.fail = false;
        this.headline = false;
        this.spinner = false;
        this.success = true;

        this.getDocument();
        console.log("SUCCESS!!", response);
      } catch (e) {
        console.log(e);
        this.fail = true;
        this.headline = false;
        this.success = false;
        this.spinner = false;
      }
    },
    async handleFileUpload() {
      this.upload(this.$refs.file.files[0]);
    },
    async onDrop(event) {
      this.upload(event.dataTransfer.files[0]);
    },
    ...mapActions(["getDocument"])
  }
};
</script>

<style>
.dropZone {
  color: #034a4a;
  min-height: 200px;
  width: 70%;
  margin: auto;
  background: #bedce0;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
  outline: 2px dashed #034a4a9c;
  outline-offset: -5px;
  text-align: center;
}

.filepLoadLabel {
  padding-top: 40px;
  width: 100%;
  height: 210px;
  position: left;
  cursor: pointer;
  z-index: -1;
}

.hiddenFileupLoad {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.draggEffect {
  background-color: white;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
  outline: 2px dashed black;
  outline-offset: -10px;
}

/* Text styling */
label .bold {
  font-weight: bold;
}

.supportedFormats {
  display: inline;
  font-weight: 900;
}

/* intray icon/image */
.b-icon.bi {
  display: block !important;
  margin: auto;
  width: 70px;
  height: 70px;
}

/* loading spinner */
.spinner {
  display: block;
}

/* Animation */
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
