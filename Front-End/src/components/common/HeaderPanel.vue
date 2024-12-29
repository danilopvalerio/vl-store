<template>
  <div class="headerPanel">
    <img src="./../../assets/images/vl-store-logo-white.svg">
  </div>
</template>

<style scoped>
.headerPanel {
  background-color: v-bind(cores(tema,4));
  width: 100%;
  height: 80px; 
  display:flex;
  justify-content: center;
  align-items: center;

}
img{
  height: 60%;
}
</style>

<script>
import { corSelect } from "./../../controllers/themeController.js";
export default {
  props: {
    temaNum: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tema: this.temaNum,
    };
  },
  methods: {
    cores(tema, cor) {
      return corSelect(tema, cor);
    },
  },
};
</script>
