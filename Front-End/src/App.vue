<template>
  <div>
    <router-view></router-view>
    <button class="theme-button" @click="trocarTema">Trocar tema</button>
  </div>
</template>

<style>
* {
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
  font-weight: 500;
}

.theme-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
  background-color: white;
  color: rgb(0, 0, 0);
  border: none;
  padding: 10px 10px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}
.theme-button:hover {
  background-color: rgb(240, 240, 240);
}
</style>

<script>
import { ref, provide } from "vue";
import { corSelect } from "./controllers/themeController";

// import ProdutoView from "./components/ProdutoView.vue";

export default {
  name: "App",
  // components: {
  //   LoginPage,
  //   // ProdutoView,
  // },
  setup() {
    const tema = ref(0);

    const trocarTema = () => {
      tema.value = (tema.value + 1) % 2; // Alternar entre 0 e 1
    };

    const cores = (tema, cor) => {
      return corSelect(tema, cor);
    };

    // Prover o valor de tema globalmente
    provide("tema", tema);

    return {
      tema,
      trocarTema,
      cores,
    };
  },
};
</script>
