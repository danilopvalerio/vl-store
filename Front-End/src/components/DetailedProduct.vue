<template>
  <div class="container-det">
    <header>
      <button @click="$emit('fechar')">❌</button>
    </header>
    <div class="text-block">
      <h2>{{ produto.titulo }}</h2>
    </div>
    <div class="main-data-group">
      <label>Categoria: {{ produto.categoria }}</label>
      <label>Material: {{ produto.material }}</label>
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
      <button @click="deletarProduto">Deletar</button>
      <button>Salvar</button>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

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
      type: Object,
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
  background-color: rgba(193, 193, 193, 0.164);
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 40px 40px 10px 10px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
}
.text-block {
  background-color: #363f4e;
  width: 90%;
  border-radius: 20px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
}

.text-block-smaller{
  background-color: #363f4e;
  width: 50%;
  border-radius: 20px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
}

/* Estilo dos títulos */
h2,
h3 {
  width: 95%;
  font-size: 19px;
  color: #ffffff;
  text-align: center;
}
header {
  background-color: #363f4e;
  width: 100%;
  height: 50px;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  justify-content: end;
  align-items: center;
}

/* Estilo dos rótulos */
.main-data-group label,
.variacao-item label {
  font-size: 15px;
  color: #000000;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.variacao-container-det {
  width: 95%;
  height: 300px;
  max-height: 400px;
  overflow-y: scroll;
  scroll-padding: 10px;
}

.variacao-container-det::-webkit-scrollbar {
  width: 10px;
  background-color: #363f4e;
  border-radius: 10px;
}
.variacao-container-det::-webkit-scrollbar-thumb {
  background-color: white;
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
  background-color: rgba(255, 255, 255, 0.245);
  height: 120px;
  border-radius: 15px;
  box-shadow: 2px 2px 4px rgba(103, 103, 103, 0.307);
}

.variacao-item:hover {
  background-color: #e2e2e2;
}

header button {
  background-color: white;
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
}
footer button {
  background-color: #363f4e;
  color: #ffffff;
  width: auto;
  height: 30px;
  padding: 15px;
  border-radius: 50px;
  border: none;
  font-size: 14px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 4px rgba(103, 103, 103, 0.307);
}
footer button:hover {
  cursor: pointer;
  background-color: #363f4e;
  color: white;
}
</style>
