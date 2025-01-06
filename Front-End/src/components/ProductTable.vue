<template>
  <div class="table-pagination-container">
    <div class="table-wrapper">
      <table id="responsive-table">
        <thead>
          <tr>
            <th class="size1">Título</th>
            <th class="size2">Categoria</th>
            <th class="size2">Material</th>
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
    Páginação
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
.table-pagination-container {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: v-bind(cores(tema, 3));
}
.table-wrapper {
  background-color: v-bind(cores(tema, 0));
  margin: 0 auto;
  height: 280px;
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
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.319); /* Sombra no texto */
}
.size1 {
  width: 50%;
}
.size2 {
  width: 20%;
}

th {
  border-radius: 40px;
  background-color: v-bind(cores(tema, 6));
  color: v-bind(cores(tema, 14));
}

th:hover {
  background-color: v-bind(cores(tema, 11));
  color: v-bind(cores(tema, 0));
}

.linha {
  background-color: v-bind(cores(tema, 10));
  color: v-bind(cores(tema, 15));
}

.linha:hover {
  background-color: v-bind(cores(tema, 11));
  color: v-bind(cores(tema, 0));
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
#pagination-num {
  color: v-bind(cores(tema, 3));
  text-align: center;
  margin: 8px;
}

.pagination button {
  white-space: nowrap;
  width: auto;
  height: 40px;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 13;
  background-color: v-bind(cores(tema, 3));
  color: v-bind(cores(tema, 9));
}

.pagination button:hover {
  background-color: v-bind(cores(tema, 21));
  color: v-bind(cores(tema, 4));
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.307); /* Sombra no texto */
}
</style>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { corSelect } from "./../controllers/themeController.js";

export default {
  name: "ProdutoTable",
  props: {
    temaNum: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    // States reativos
    const produtos = ref([]);
    const paginaAtual = ref(1);
    const itensPorPagina = ref(5);
    const pesquisa = ref("");
    const pesquisaSubmit = ref("");
    const produtoSelecionado = ref(null);
    const tema = ref(props.temaNum);

    // Métodos
    const cores = (tema, cor) => corSelect(tema, cor);

    const mudarPagina = (pagina) => {
      if (pagina >= 1 && pagina <= totalPaginas.value) {
        paginaAtual.value = pagina;
      }
    };

    const pesquisarProduto = (e) => {
      pesquisaSubmit.value = e;
      paginaAtual.value = 1; // Resetar para a primeira página ao pesquisar
    };

    const limparPesquisa = () => {
      pesquisa.value = "";
      pesquisaSubmit.value = "";
      paginaAtual.value = 1; // Retornar à primeira página
    };

    const exibirDetalhes = (produto) => {
      emit("exibir-detalhes", produto);
    };

    const obterProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/produtos");
        produtos.value = response.data;
      } catch (error) {
        console.error("Erro ao obter produtos:", error);
      }
    };

    const atualizar = () => {
      produtos.value = [];
      pesquisa.value = "";
      pesquisaSubmit.value = "";
      paginaAtual.value = 1;
      obterProdutos();
    };

    // Computed properties
    const totalPaginas = computed(() => {
      return Math.ceil(produtos.value.length / itensPorPagina.value);
    });

    const produtosFiltrados = computed(() => {
      let produtosFiltrados = produtos.value;

      // Filtra os produtos se houver um termo de pesquisa
      if (pesquisaSubmit.value) {
        const termoPesquisa = pesquisaSubmit.value.toLowerCase();
        produtosFiltrados = produtosFiltrados.filter((produto) => {
          // Verificando se o termo de pesquisa está no título, categoria ou material
          const correspondeEmCamposPrincipais =
            produto.titulo?.toLowerCase().includes(termoPesquisa) ||
            produto.categoria?.toLowerCase().includes(termoPesquisa) ||
            produto.material?.toLowerCase().includes(termoPesquisa);

          const correspondeEmVariações = produto.variacoes?.some((variacao) => {
            // Criando uma string que combina os campos relevantes das variações
            const variacaoString = `${variacao.variacao} ${variacao.quantidade} ${variacao.valor}`;
            return variacaoString.toLowerCase().includes(termoPesquisa);
          });
          // Retorna true se algum dos campos principais ou das variações corresponder ao termo de pesquisa
          return correspondeEmCamposPrincipais || correspondeEmVariações;
        });
      }

      // Aplica a paginação nos produtos filtrados
      const inicio = (paginaAtual.value - 1) * itensPorPagina.value;
      const fim = inicio + itensPorPagina.value;

      return produtosFiltrados.slice(inicio, fim);
    });

    // Lifecycle hooks
    onMounted(() => {
      obterProdutos();
    });

    return {
      produtos,
      paginaAtual,
      itensPorPagina,
      pesquisa,
      pesquisaSubmit,
      produtoSelecionado,
      tema,
      totalPaginas,
      produtosFiltrados,
      cores,
      mudarPagina,
      pesquisarProduto,
      limparPesquisa,
      exibirDetalhes,
      atualizar,
    };
  },
};
</script>
