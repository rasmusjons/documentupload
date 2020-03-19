<template>
  <div>
    <app-up-load></app-up-load>

    <app-display-file></app-display-file>
    <br />
  </div>
</template>

<script>
import UploadVue from "../components/Upload";
import DisplayFileVue from "../components/DisplayFile.vue";

export default {
  name: "Home",
  components: {
    appUpLoad: UploadVue,
    appDisplayFile: DisplayFileVue
  }
};
</script>

<style scoped>
.relax {
  width: 100px;
}
</style>
