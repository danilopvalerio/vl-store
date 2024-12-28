<template>
  <div class="headerPanel">
    <div class="logo_panel">
      <img src="./../../assets/images/vl-store-logo-white.svg" />
    </div>
  </div>
</template>

<style scoped>
.headerPanel {
  background-color: v-bind(cores(tema,4));
  box-sizing: border-box;
  width: 100%;
  height: 80px; /* Altura fixa do painel */
  padding: 0 20px; /* Ajuste de espaçamento nas laterais */
  display: flex;
  justify-content: center; /* Centraliza o conteúdo horizontalmente */
  align-items: center; /* Centraliza o conteúdo verticalmente */
}

/* Logo */
.logo_panel {
  width: 100%; /* A logo vai ocupar toda a largura disponível */
  display: flex;
  justify-content: center; /* Centraliza a logo horizontalmente */
  align-items: center; /* Centraliza a logo verticalmente */
  height: 100%; /* A logo terá a altura total do painel */
}

.logo_panel img {
  width: auto; /* Ajusta a largura automaticamente */
  max-height: 60%; /* Garante que a altura da logo não ultrapasse 80% da altura do painel */
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
