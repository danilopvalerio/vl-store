<template>
  <div class="barra-pesquisa-container">
    <input
      v-model="pesquisa"
      type="text"
      placeholder="Pesquisar produto..."
      class="barra-pesquisa"
    />
    <button @click="pesquisarProduto" class="btn" style="margin-right: 40px">
      Pesquisar
    </button>
    <button @click="$emit('mostrarFormulario')" class="btn">
      Adicionar produto
    </button>
    <button @click="limparPesquisa" class="btn">Limpar</button>
  </div>
</template>

<style scoped>
.barra-pesquisa-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 40px;
}

.barra-pesquisa {
  width: 50%;
  height: 100%;
  padding: 5px;
  border-radius: 30px;
  background-color: v-bind(cores(1));
  color: v-bind(cores(2));
  border: 1px solid v-bind(cores(13));
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.307);
}

.barra-pesquisa:focus {
  border-color: v-bind(cores(4));
  outline: none;
  background-color: v-bind(cores(1));
}

.btn {
  white-space: nowrap;
  width: auto;
  height: 40px;
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: v-bind(cores(3));
  color: v-bind(cores(9));
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.307);
}

.btn:hover {
  background-color: v-bind(cores(21));
  color: v-bind(cores(4));
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.307); /* Sombra no texto */
}
</style>

<script>
import { ref, inject, watch } from "vue";
import { corSelect } from "./../controllers/themeController.js";

export default {
  name: "BarraPesquisa",
  setup(props, { emit }) {
    const pesquisa = ref("");

    const tema = inject("tema");

    watch(tema, (novoTema) => {
      tema.value = novoTema;
    });

    // Métodos
    const cores = (cor) => corSelect(tema.value, cor);

    const pesquisarProduto = () => {
      emit("pesquisar", pesquisa.value);
    };

    const limparPesquisa = () => {
      pesquisa.value = "";
      emit("limparPesquisa");
    };

    return {
      pesquisa,
      tema,
      pesquisarProduto,
      limparPesquisa,
      cores,
    };
  },
};
</script>
