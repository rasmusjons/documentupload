<template>
  <div>
    <h5>This app was made using Vue, Node and Express</h5>
    <p>Please enjoy the sunrise &#9996;</p>
    <app-about-balloon></app-about-balloon>
  </div>
</template>

<script>
import AboutBalloon from "../components/AboutBalloon.vue";

export default {
  components: {
    appAboutBalloon: AboutBalloon
  }
};
</script>
<style></style>
