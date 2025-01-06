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
  background-color: v-bind(cores(tema, 1));
  color: v-bind(cores(tema, 2));
  border: 1px solid v-bind(cores(tema, 12));
}

.barra-pesquisa:focus {
  border-color: v-bind(cores(tema, 4));
  outline: none;
  background-color: v-bind(cores(tema, 1));
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
  background-color: v-bind(cores(tema, 3));
  color: v-bind(cores(tema, 9));
}

.btn:hover {
  background-color: v-bind(cores(tema, 21));
  color: v-bind(cores(tema, 4));
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.307); /* Sombra no texto */
}
</style>

<script>
import { ref } from "vue";
import { corSelect } from "./../controllers/themeController.js";

export default {
  name: "BarraPesquisa",
  props: {
    temaNum: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const pesquisa = ref("");
    const tema = ref(props.temaNum);

    const pesquisarProduto = () => {
      emit("pesquisar", pesquisa.value);
    };

    const limparPesquisa = () => {
      pesquisa.value = "";
      emit("limparPesquisa");
    };

    const cores = (tema, cor) => corSelect(tema, cor);

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
