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
    <button @click="$emit('mostrarFormulario')" class="btn">Adicionar produto</button>
    <button @click="limparPesquisa" class="btn">Limpar</button>
  </div>
</template>

<style scoped>
.barra-pesquisa-container {
  display: flex;
  justify-content: center;
  width: 90%;
  height: 40px;
}

.barra-pesquisa {
  width: 50%;
  height: 100%;
  padding: 10px;
  border-radius: 30px;
  font-size: 13px;
  background-color: v-bind(cores(tema, 0));
  color: v-bind(cores(tema, 2));
  border: 1px solid v-bind(cores(tema, 6));
}

.barra-pesquisa:focus {
  border-color: v-bind(cores(tema, 6));
  outline: none;
  background-color: v-bind(cores(tema, 1));
}

.btn {
  white-space: nowrap;
  width: auto;
  height: 100%;
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 13;
  background-color: v-bind(cores(tema, 4));
  color: v-bind(cores(tema, 0));
}

.btn:hover {
  background-color: v-bind(cores(tema, 6));
}
</style>

<script>
import { corSelect } from "./../controllers/themeController.js";

export default {
  name: "BarraPesquisa",
  data() {
    return {
      pesquisa: "",
      tema: this.temaNum,
    };
  },
  methods: {
    pesquisarProduto() {
      this.$emit("pesquisar", this.pesquisa);
    },
    
    limparPesquisa() {
      this.pesquisa = "";
      this.$emit("limparPesquisa");
    },
    cores(tema, cor) {
      return corSelect(tema, cor);
    },
  },
  props: {
    temaNum: {
      type: Number,
      required: true,
    },
  },
};
</script>
