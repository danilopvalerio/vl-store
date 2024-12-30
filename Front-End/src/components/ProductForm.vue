<template>
  <div class="form-container">
    <div class="text-block">
      <h2>Cadastro de Produto</h2>
    </div>
    <form>
      <div class="form-group">
        <label>Título:</label>
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
        <label>Categoria:</label>
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
        <label>Material:</label>
        <input
          v-model="produto.material"
          type="text"
          id="material"
          name="material"
          required
          placeholder="Digite o material..."
        />
        <label>Gênero:</label>
        <select v-model="produto.genero" id="genero" name="genero" required>
          <option value="unissex">Unissex</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
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
          <div class="variacao-item-entry size1">
            <label for="cor">Cor:</label>
            <input
              class="size3"
              v-model="variacao.cor"
              type="text"
              name="cor"
              required
              placeholder="Digite a cor..."
            />
          </div>

          <div class="variacao-item-entry size3">
            <label for="tamanho">Tamanho:</label>
            <input
              class="size2"
              v-model="variacao.tamanho"
              type="text"
              name="tamanho"
              required
              placeholder="Tamanho..."
            />
          </div>

          <div class="variacao-item-entry size2">
            <label for="quantidade">Quantidade</label>
            <input
              class="size1"
              v-model="variacao.quantidade"
              type="number"
              name="quantidade"
              required
              min="1"
              placeholder="01"
            />
          </div>

          <div class="variacao-item-entry size2">
            <label for="valor">Valor</label>
            <input
              class="size1"
              v-model="variacao.valor"
              type="number"
              name="valor"
              required
              min="1"
              step="1"
            />
          </div>

          <button
            :disabled="produto.variacoes.length === 1"
            type="button"
            @click="removerVariacao(index)"
          >
            X
          </button>
        </div>
      </div>
    </form>
    <div class="form-close-save">
      <button @click="fecharFormulario">Fechar</button>
      <button @click="adicionarVariacao">Adicionar Variação</button>
      <button @click="salvarProduto" class="button">Salvar Produto</button>
    </div>
  </div>
</template>

<script>
import { corSelect } from "./../controllers/themeController.js";
import axios from "axios";
export default {
  data() {
    return {
      tema: this.temaNum,
      editar: false,
      produto: {
        titulo: "",
        categoria: "",
        material: "",
        genero: "unissex", // Gênero com valor padrão
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
  created() {
    if (this.produtoEditar != null) {
      this.editar = true;
      this.produto = this.produtoEditar;
    }
  },
  props: {
    temaNum: {
      type: Number,
      required: true,
    },
    produtoEditar: {
      type: Number,
      required: false,
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
        tema: this.temaNum,
      });
    },
    cores(tema, cor) {
      return corSelect(tema, cor);
    },
    removerVariacao(index) {
      this.produto.variacoes.splice(index, 1);
    },
    salvarProduto() {
      if (this.editar) {
        this.editarProduto();
      } else {
        axios
          .post("http://localhost:5000/api/produtos/", this.produto)
          .then((response) => {
            alert("Produto criado com sucesso:", response.data);
          })
          .catch((error) => {
            alert("Erro ao criar o produto:", error);
          });

        this.fecharFormulario();
      }
    },
    editarProduto() {
      console.log(this.produto._id);
      axios
        .put(
          `http://localhost:5000/api/produtos/${this.produto._id}`,
          this.produto
        )
        .then((response) => {
          alert("Produto editado com sucesso:", response.data);
        })
        .catch((error) => {
          alert("Erro ao editar o produto:", error);
        });

      this.fecharFormulario(this.produto);
    },
    fecharFormulario(produtoFinal) {
      this.limparEntradas();
      this.$emit("fechar", produtoFinal);
    },
    limparEntradas() {
      this.produto = {
        titulo: "",
        categoria: "",
        material: "",
        genero: "unissex", // Resetando o valor de gênero
        variacoes: [
          {
            cor: "",
            tamanho: "",
            quantidade: "",
            valor: "",
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.form-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  color: v-bind(cores(tema, 2));
  height: 580px;
  width: 100%;
  max-width: 700px;
  padding: 0px 0px 5px 0px;
  background-color: v-bind(cores(tema, 8));
  backdrop-filter: blur(15px);
  border-radius: 40px 40px 10px 10px;
  box-shadow: 0 4px 15px v-bind(cores(tema, 17));

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-around;
}
input,
select {
  color: v-bind(cores(tema, 2));
}
form {
  padding: 0px 10px;
  border-radius: 10px;
  width: 100%;
  height: 75%;
}
h2,
h3 {
  font-size: 18px;
  color: v-bind(cores(tema, 2));
  text-align: center;
}

.form-group {
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
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
.form-group input,
select {
  outline: none;
  height: 30px;
  border: none;
  background-color: v-bind(cores(tema, 1));
  border-radius: 15px;
  border: 1px solid v-bind(cores(tema, 222));
  padding: 5px 10px;
  width: 60%;
  box-shadow: 2px 2px 4px v-bind(cores(tema, 22));
}

.variacao-container {
  width: 100%;
  height: 250px;
  overflow-y: scroll;
  border: 1px solid v-bind(cores(tema, 13));
  border-radius: 4px;
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
  margin: 5px;
}
.size1 {
  width: 50%;
}
.size2 {
  width: 15%;
}
.size3 {
  width: 20%;
}
.variacao-item-entry label {
  font-size: 13px;
  margin-bottom: 10px;
}

.variacao-item-entry input {
  width: 100%;
  outline: none;
  height: 30px;
  border: none;
  background-color: v-bind(cores(tema, 1));
  border-radius: 15px;
  border: 1px solid v-bind(cores(tema, 22));
  padding: 5px;
  box-shadow: 2px 2px 4px v-bind(cores(tema, 22));
  text-align: center;
}

#material,
select {
  width: 30%;
}
select {
  width: 20%;
}

.variacao-item button {
  background-color: v-bind(cores(tema, 5)); /* Cor de fundo vermelha */
  color: v-bind(cores(tema, 0)); /* Cor do texto (o 'X') */
  border: none;
  border-radius: 50%; /* Deixa o botão redondo */
  width: 30px; /* Largura fixa */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px 15px;
  font-size: 18px; /* Tamanho do 'X' */
  transition: background-color 0.3s ease; /* Efeito de transição suave na cor de fundo */
  margin-right: 10px;
}

.variacao-item button:hover {
  background-color: v-bind(cores(tema, 4));
}

.variacao-item button:focus {
  outline: none;
}

.form-close-save {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
}
.form-close-save button {
  color: v-bind(cores(tema, 20));
  background-color: v-bind(cores(tema, 4));
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  box-sizing: border-box; /* Garante que a borda fique dentro do botão */
}

.form-close-save button:hover {
  cursor: pointer;
  background-color: v-bind(cores(tema, 0));
  color: v-bind(cores(tema, 4));
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.307); /* Sombra no texto */
}
@media (max-width: 600px) {
  .variacao-item input {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
