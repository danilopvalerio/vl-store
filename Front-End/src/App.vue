<template>
  <div class="dd">
    <ProdutoView :key="tema" :temaNum="tema" />
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
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* Sombra */
}
.theme-button:hover{
  background-color: rgb(240, 240, 240);
}
</style>

<script>
import { corSelect } from "./controllers/themeController";
import ProdutoView from "./components/ProdutoView.vue";
export default {
  name: "App",
  components: {
    ProdutoView,
  },
  data() {
    return {
      tema: 0,
      totalTemas: 2, // Total de temas disponíveis
    };
  },
  methods: {
    trocarTema() {
      this.tema = (this.tema + 1) % this.totalTemas;
    },
  },
  cores(tema, cor) {
    return corSelect(tema, cor);
  },
};
</script>
