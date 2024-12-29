<template>
  <div class="dd">
    <ProdutoView :temaNum="tema" />
  </div>
</template>

<style scope>
* {
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
}
</style>
<script>
import ProdutoView from "./components/ProdutoView.vue";
export default {
  name: "App",
  components: {
    ProdutoView,
  },
  data() {
    return {
      tema: 0,
    };
  },
};
</script>
