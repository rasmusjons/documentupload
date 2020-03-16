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
      <p v-if="!success">Drag & Drop</p>
      <b-spinner type="grow" label="Loading..." v-if="spinner"></b-spinner>

      <p v-if="success">Uploading Done! Upload again?</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file: "",
      dragging: false,
      success: false,
      fail: false,
      spinner: false
    };
  },

  methods: {
    drag() {
      console.log(this.dragging);
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
        console.log("SUCCESS!!", response);
      } catch (e) {
        console.log(e);
      }
    },

    /*
        Handles a change on the file upload
      */
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>

<style>
.dropZone {
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
</style>
