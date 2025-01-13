<template>
  <div class="footerPanel">
    <button>Voltar</button>
  </div>
</template>

<style scoped>
.footerPanel {
  background-color: v-bind(cores(4));
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
  background-color: v-bind(cores(20));
  color: v-bind(cores(4));
}

button:hover {
  background-color: v-bind(cores(4));
  color: v-bind(cores(21));
}
</style>

<script>
import { watch, inject } from "vue";
import { corSelect } from "./../../controllers/themeController.js";
export default {
  setup() {
    const tema = inject("tema");

    watch(tema, (novoTema) => {
      tema.value = novoTema;
    });

    // Métodos
    const cores = (cor) => corSelect(tema.value, cor);

    // Observar mudanças no valor de temaNum e atualizar o tema

    return {
      tema,
      cores,
    };
  },
};
</script>
