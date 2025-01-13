<template>
  <div class="headerPanel">
    <img src="./../../assets/images/vl-store-logo-white.svg" />
  </div>
</template>

<style scoped>
.headerPanel {
  background-color: v-bind(
    cores(4)
  ); /* A cor será atualizada aqui quando tema mudar */
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  height: 60%;
}
</style>

<script>
import { corSelect } from "./../../controllers/themeController.js";
import { watch, inject } from "vue"; // Importar watch e ref do Vue

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
