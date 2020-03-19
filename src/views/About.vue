<template>
  <div>
    <h5>This app was made using Vue, Node and Express</h5>
    <p>Please enjoy the sunrise &#9996;</p>
    <app-svg></app-svg>
  </div>
</template>

<script>
import SvgVue from "../components/Svg.vue";
export default {
  components: {
    appSvg: SvgVue
  }
};
</script>
<style></style>
