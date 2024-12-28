<template>
  <div class="container">
    <div class="table-wrapper">
      <table id="responsive-table">
        <thead>
          <tr>
            <th class="size1">Título</th>
            <th class="size2">Material</th>
            <th class="size2">Categoria</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="produto in produtosFiltrados"
            :key="produto._id"
            class="linha"
            @click="exibirDetalhes(produto)"
          >
            <td>{{ produto.titulo || "N/A" }}</td>
            <td>{{ produto.categoria }}</td>
            <td>{{ produto.material }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button
        @click="mudarPagina(paginaAtual - 1)"
        :disabled="paginaAtual === 1"
        class="btn-paginacao"
      >
        Anterior
      </button>
      <span id="pagination-num">{{ paginaAtual }}</span>
      <button
        @click="mudarPagina(paginaAtual + 1)"
        :disabled="paginaAtual === totalPaginas"
        class="btn-paginacao"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<style scoped>
* {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.288); /* Sombra no texto */
}

.table-wrapper {
  background-color: v-bind(cores(tema, 0));
  margin: 0 auto;
  height: 280px;
  width: 100%;
  margin-bottom: 20px;
  width: 90%;
}

table {
  width: 100%;
  border-collapse: separate;
  border-radius: 10px;
  border-spacing: 10px;
}

th,
td {
  text-align: center;
  padding: 8px;
  font-size: 13px;
  overflow: hidden; /* Ocultando o conteúdo excedente */
  text-overflow: ellipsis; /* Adicionando '...' quando o texto for muito grande */
  white-space: nowrap; /* Impedindo a quebra de linha do texto */
  border-radius: 25px;
  box-shadow: 2px 2px 4px rgba(103, 103, 103, 0.307); /* Sombra no texto */
}
.size1 {
  width: 50%;
}
.size2 {
  width: 20%;
}

th {
  border-radius: 40px;
  font-weight: 500;
  background-color: v-bind(cores(tema, 6));
  color: v-bind(cores(tema, 3));
}

th:hover {
  background-color: v-bind(cores(tema, 4));
  color: v-bind(cores(tema, 0));
}

.linha {
  background-color: v-bind(cores(tema, 1));
  color: v-bind(cores(tema, 3));
}

.linha:hover {
  background-color: v-bind(cores(tema, 4));
  color: v-bind(cores(tema, 0));
  font-weight: 500;
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
#pagination-num {
  color: v-bind(cores(tema, 4));
}

.pagination button {
  background-color: v-bind(cores(tema, 4));
  color: v-bind(cores(tema, 0));;
  padding: 8px 16px;
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 15px;
  transition: background-color 0.3s;
}

.pagination button:hover{
  background-color: v-bind(cores(tema, 0));
  color: v-bind(cores(tema, 4));
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.307); /* Sombra no texto */
}
</style>      

<script>
import axios from "axios";
import { corSelect } from "./../controllers/themeController.js";

export default {
  name: "ProdutoTable",
  data() {
    return {
      produtos: [],
      paginaAtual: 1,
      itensPorPagina: 5,
      pesquisa: "", // Variável para pesquisa
      pesquisaSubmit: "", // Variável que será utilizada na função de pesquisa
      produtoSelecionado: null,
      tema: this.temaNum,
    };
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.produtos.length / this.itensPorPagina);
    },
    produtosPaginados() {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;
      return this.produtos.slice(inicio, fim);
    },
    produtosFiltrados() {
      if (!this.pesquisaSubmit) {
        return this.produtosPaginados;
      }
      const termoPesquisa = this.pesquisaSubmit.toLowerCase();
      return this.produtos.filter((produto) => {
        return (
          produto.titulo.toLowerCase().includes(termoPesquisa) ||
          produto.categoria.toLowerCase().includes(termoPesquisa) ||
          produto.material.toLowerCase().includes(termoPesquisa) ||
          produto.cor_variacao?.toLowerCase().includes(termoPesquisa) ||
          produto.tamanho?.toLowerCase().includes(termoPesquisa)
        );
      });
    },
  },
  mounted() {
    this.obterProdutos();
  },
  methods: {
    selecionarProduto(produto) {
      this.produtoSelecionado = produto;
    },
    cores(tema, cor) {
      return corSelect(tema, cor);
    },
    mostrarFormulario() {
      this.exibirFormulario = !this.exibirFormulario;
    },
    async obterProdutos() {
      await axios
        .get("http://localhost:5000/api/produtos")
        .then((response) => {
          this.produtos = response.data;
        })
        .catch((error) => {
          console.error("Erro ao obter produtos:", error);
        });
    },
    mudarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaAtual = pagina;
      }
    },
    pesquisarProduto(e) {
      this.pesquisaSubmit = e;
      this.paginaAtual = 1; // Resetar para a primeira página ao pesquisar
    },
    limparPesquisa() {
      this.pesquisa = ""; // Limpar o campo de entrada
      this.pesquisaSubmit = ""; // Resetar a pesquisa ativa
      this.paginaAtual = 1; // Retornar à primeira página
    },
    fecharPopUp() {
      this.mostrarFormulario();
    },
    exibirDetalhes(produto) {
      this.$emit("exibir-detalhes", produto);
    },
    atualizar() {
      // Resetar as variáveis de estado
      this.produtos = [];
      this.pesquisa = "";
      this.pesquisaSubmit = "";
      this.paginaAtual = 1;

      // Reobter os produtos
      this.obterProdutos();
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
