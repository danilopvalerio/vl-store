<template>
  <div class="form-container">
    <header></header>
    <div class="text-block">
      <h2>Cadastro de Produto</h2>
    </div>
    <form @submit.prevent="salvarProduto">

      <div class="form-group">
        <label for="titulo">Título:</label>
        <input
          v-model="produto.titulo"
          type="text"
          id="titulo"
          name="titulo"
          required
          placeholder="Digite o título..."
        />
      </div>

      <div class="form-group">
        <label for="categoria">Categoria:</label>
        <input
          v-model="produto.categoria"
          type="text"
          id="categoria"
          name="categoria"
          required
          placeholder="Digite a categoria..."
        />
      </div>

      <div class="form-group">
        <label for="material">Material:</label>
        <input
          v-model="produto.material"
          type="text"
          id="material"
          name="material"
          required
          placeholder="Digite o material..."
        />
      </div>

      <div class="text-block-smaller">
        <h3>Variações de Produto:</h3>
      </div>

      <div class="variacao-container">
        <div
          v-for="(variacao, index) in produto.variacoes"
          :key="index"
          class="variacao-item"
        >
          <div class="variacao-item-entry">
            <label for="cor">Cor:</label>
            <input
              class="size2"
              v-model="variacao.cor"
              type="text"
              name="cor"
              required
            />
          </div>

          <div class="variacao-item-entry">
            <label for="tamanho">Tamanho:</label>
            <input
              class="size1"
              v-model="variacao.tamanho"
              type="text"
              name="tamanho"
              required
            />
          </div>

          <div class="variacao-item-entry">
            <label for="quantidade">Quantidade</label>
            <input
              class="size1"
              v-model="variacao.quantidade"
              type="number"
              name="quantidade"
              required
              min="1"
            />
          </div>

          <div class="variacao-item-entry">
            <label for="valor">Valor</label>
            <input
              class="size1"
              v-model="variacao.valor"
              type="number"
              name="valor"
              required
              min="0.01"
              step="0.01"
            />
          </div>

          <button type="button" @click="removerVariacao(index)">X</button>
        </div>
      </div>
      <div class="form-close-save">
      <button @click="fecharFormulario">Fechar</button>
      <button type="button" @click="adicionarVariacao">
        Adicionar Variação
      </button>
      <button type="submit" class="button">Salvar Produto</button>
    </div>
    </form>
    
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
header {
  height: 50px;
  width: 100%;
  background-color: v-bind(cores(tema, 4));
  border-radius: 40px 40px 0px 0px;
}
.form-container {
  width: 100%;
  max-width: 600px;
  padding: 0px 0px 20px 0px;
  background-color: rgba(193, 193, 193, 0.164);
  backdrop-filter: blur(15px);
  border-radius: 40px 40px 10px 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.381);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.text-block {
  background-color: v-bind(cores(tema,4));
  width: 50%;
  border-radius: 20px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
}

.text-block-smaller {
  background-color: v-bind(cores(tema,4));
  width: 50%;
  border-radius: 20px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
}
form {
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  height: 80%;
}
h2 {
  color: v-bind(cores(tema,0));
  text-align: center;
}

h3 {
  color: v-bind(cores(tema,0));
  text-align: center;
}

.form-group {
  height: 10%;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-group label {
  width: 17%;
  text-align: right;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: end;
  margin-right: 20px;
}
.form-group input {
  outline: none;
  height: 30px;
  border: none;
  background-color: v-bind(cores(tema,1));
  border-radius: 15px;
  border: 1px solid v-bind(cores(tema,6));
  padding: 10px;
  width: 60%;
  box-shadow: 2px 2px 4px rgba(103, 103, 103, 0.307); /* Sombra no texto */
}

.variacao-container {
  height: 250px;
  overflow-y: scroll;
  padding-right: 15px; /* Reserva o espaço da scrollbar */
  padding: 10px;
  border: 1px solid v-bind(cores(tema,6));
  border-radius: 4px;
  margin-bottom: 20px;
}

.variacao-container::-webkit-scrollbar {
  width: 10px;
  background-color: white;
  border-radius: 10px;
}
.variacao-container::-webkit-scrollbar-thumb {
  background-color: #363f4e;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.variacao-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.variacao-item-entry {
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: column;
}
.variacao-item-entry label {
  font-size: 13px;
  margin-bottom: 10px;
}

.variacao-item-entry input {
  outline: none;
  height: 30px;
  border: none;
  background-color: v-bind(cores(tema,1));
  border-radius: 15px;
  border: 1px solid v-bind(cores(tema,6));
  padding: 10px;
  box-shadow: 2px 2px 4px rgba(103, 103, 103, 0.307);
  text-align: center;
}

.size1 {
  width: 60%;
}
.size2 {
  width: 100%;
}

.variacao-item button {
  background-color: v-bind(cores(tema,5)); /* Cor de fundo vermelha */
  color: v-bind(cores(tema,0)); /* Cor do texto (o 'X') */
  border: none;
  border-radius: 50%; /* Deixa o botão redondo */
  width: 30px; /* Largura fixa */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px; /* Tamanho do 'X' */
  transition: background-color 0.3s ease; /* Efeito de transição suave na cor de fundo */
}

.variacao-item button:hover {
  background-color: v-bind(
    cor4
  ); /* Cor de fundo ao passar o mouse (efeito hover) */
}

.variacao-item button:focus {
  outline: none; /* Remove a borda de foco padrão */
}

.form-close-save {
  padding-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-close-save button {
  color: v-bind(cores(tema,0));
  background-color: v-bind(cores(tema,4));
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  box-sizing: border-box; /* Garante que a borda fique dentro do botão */
}

.form-close-save button:hover {
  color: v-bind(cores(tema,0));
  background-color: v-bind(cores(tema,6));
  box-sizing: border-box;
}
@media (max-width: 600px) {
  .variacao-item input {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>

<script>
import { corSelect } from "./../controllers/themeController.js";
export default {
  data() {
    return {
      tema: this.temaNum,
      produto: {
        titulo: "",
        categoria: "",
        material: "",
        variacoes: [
          {
            cor: "",
            tamanho: "",
            quantidade: "",
            valor: "",
          },
        ],
      },
    };
  },
  props: {
    temaNum: {
      type: Number,
      required: true,
    },
  },
  methods: {
    adicionarVariacao() {
      this.produto.variacoes.push({
        ref: "",
        cor: "",
        tamanho: "",
        quantidade: 1,
        valor: 0.01,
        tema : this.temaNum,
      });
    },
    cores(tema, cor) {
      return corSelect(tema,cor);
    },
    removerVariacao(index) {
      this.produto.variacoes.splice(index, 1);
    },
    salvarProduto() {
      console.log("Produto a ser enviado:", this.produto);
      // Aqui você pode enviar os dados para o servidor usando fetch ou axios
    },
    fecharFormulario() {
      // Emite o evento 'fechar' para o componente pai
      this.$emit("fechar");
    },
  },
};
</script>
