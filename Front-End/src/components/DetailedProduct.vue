<template>
  <div class="container-det">
    <div class="text-block">
      <h2>{{ produto.titulo }}</h2>
    </div>
    <div class="main-data-group">
      <label>Categoria: {{ produto.categoria }}</label>
      <label>Material: {{ produto.material }}</label>
      <label>Total geral em estoque: {{ contaTotal }}</label>
    </div>
    <div class="text-block-smaller">
      <h3>Variações do produto</h3>
    </div>
    <div class="variacao-container-det">
      <div
        v-for="(variacao, index) in produto.variacoes"
        :key="index"
        class="variacao-item"
      >
        <label>Cor: {{ variacao.cor }}</label>
        <label>Tamanho: {{ variacao.tamanho }}</label>
        <label>Quantidade: {{ variacao.quantidade }}</label>
        <label>Valor: {{ variacao.valor }}</label>
      </div>
    </div>
    <footer>
      <button @click="$emit('fechar')">Fechar</button>
      <button @click="deletarProduto">Deletar</button>
      <button @click="$emit('editar')">Editar</button>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import { corSelect } from "@/controllers/themeController";

export default {
  name: "DetailedProduct",
  data() {
    return {
      tema: this.temaNum,
    };
  },
  props: {
    produto: {
      type: Object,
      required: true,
      default: () => ({
        titulo: "",
        categoria: "",
        material: "",
        variacoes: [],
      }),
    },
    temaNum: {
      type: Number,
      required: true,
    },
  },
  methods: {
    fecharJanela() {
      // Lógica para fechar a janela ou realizar outra ação
      console.log("Janela fechada");
    },
    async deletarProduto() {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/produtos/${this.produto._id}`
        );
        console.log("Produto deletado com sucesso:", response.data);
        this.$emit("produto-deletado");
        this.$emit("fechar");
      } catch (error) {
        console.error(
          "Erro ao deletar o produto:",
          error.response || error.message
        );
        alert("Erro ao deletar o produto. Tente novamente.");
      }
    },
    cores(tema, cor) {
      return corSelect(tema, cor);
    },
  },
  computed: {
    contaTotal() {
      // Soma as quantidades de todas as variações
      return this.produto.variacoes.reduce(
        (total, variacao) => total + variacao.quantidade,
        0
      );
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  text-shadow: none;
}
/* container-det principal */
.container-det {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;

  background-color: rgba(193, 193, 193, 0.164);
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.578);
  width: 100%;
  height: 80%;

  max-width: 600px;
  margin: 0 auto;
  border-radius: 40px 40px 10px 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Estilo dos títulos */
h2,
h3 {
  width: auto;
  font-size: 19px;
  color: v-bind(cores(tema,4));
  text-align: center;
}
header {
  background-color: v-bind(cores(tema,4));
  width: 100%;
  height: 50px;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Estilo dos rótulos */
.main-data-group label,
.variacao-item label {
  font-size: 15px;
  color: v-bind(cores(tema,2));
  display: block;
  margin: 5px 0;
}

/* Estilo do grupo de dados principais */
.main-data-group {
  margin: 20px 0px 2p;
  width: 90%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.245);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.411);
  margin-bottom: 20px;
}
.variacao-container-det {
  background-color: none;
  width: 95%;
  height: 300px;
  max-height: 400px;
  overflow-y: scroll;
  scroll-padding: 10px;
  border-radius: 10px;
}

.variacao-container-det::-webkit-scrollbar {
  width: 10px;
  background-color: v-bind(cores(tema,4));
  border-radius: 10px;
}
.variacao-container-det::-webkit-scrollbar-thumb {
  background-color: v-bind(cores(tema,0));
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.variacao-item {
  margin: 10px 10px 10px 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  background-color: rgba(255, 255, 255, 0.753);
  height: 120px;
  border-radius: 15px;
  box-shadow: 2px 2px 4px rgba(103, 103, 103, 0.307);
}

.variacao-item:hover {
  background-color: v-bind(cores(tema,1));
}

header button {
  background-color: v-bind(cores(tema,0));
  width: 30px;
  height: 30px;
  border-radius: 50px;
  border: none;
  font-size: 14px;
  margin: 20px;
}
header button:hover {
  cursor: pointer;
  background-color: #dddddd;
}
footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  margin: 10px;
}
footer button {
  color: #ffffff;
  background-color: v-bind(cores(tema,4));
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  box-sizing: border-box; /* Garante que a borda fique dentro do botão */
}
footer button:hover {
  cursor: pointer;
  background-color: v-bind(cores(tema,0));
  color: v-bind(cores(tema,4));
}
</style>
