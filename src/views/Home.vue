<template>
  <div>
    <app-up-load></app-up-load>
    <app-display-file></app-display-file>
  </div>
</template>

<script>
import UploadVue from "./Upload.vue";
import DisplayFileVue from "./DisplayFile.vue";

export default {
  name: "Home",
  components: {
    appUpLoad: UploadVue,
    appDisplayFile: DisplayFileVue
  }
};
</script>
