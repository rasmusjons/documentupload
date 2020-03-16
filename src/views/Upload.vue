<template>
  <div
    class="dropZone"
    :class="{ draggClass: dragging }"
    @dragover.prevent
    @drop.stop.prevent="onDrop"
    @dragenter="dragging = true"
    @dragleave="dragging = false"
  >
    <p>Drag & Drop</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file: "",
      dragging: false
    };
  },

  methods: {
    drag() {
      console.log(this.dragging);
    },
    onDrop(event) {
      this.file = event.dataTransfer.files[0];

      const formData = new FormData();

      formData.append("document", this.file);

      /*
          Make the request to the POST /single-file URL
        */
      axios
        .post("http://localhost:3000/documents", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
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
  background: goldenrod;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
}
.draggClass {
  background: mistyrose;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
}

p {
  text-align: center;
}
</style>
