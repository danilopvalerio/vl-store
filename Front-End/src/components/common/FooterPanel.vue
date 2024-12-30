<template>
  <div class="footerPanel">
    <button>Voltar</button>
  </div>
</template>

<style scoped>
.footerPanel {
  background-color: v-bind(cores(tema, 4));
  box-sizing: border-box;
  width: 100%;
  height: 55px; /* Altura fixa do painel */
  padding: 0 20px; /* Ajuste de espaçamento nas laterais */
  display: flex;
  justify-content: center; /* Centraliza o conteúdo horizontalmente */
  align-items: center; /* Centraliza o conteúdo verticalmente */
}

button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 13;
  background-color: v-bind(cores(tema, 0));
  color: v-bind(cores(tema, 3));
}

button:hover {
    background-color: v-bind(cores(tema,8));
    color: v-bind(cores(tema,0));
    
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
