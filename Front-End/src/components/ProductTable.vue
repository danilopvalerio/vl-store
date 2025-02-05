<template>
  <div class="table-pagination-container">
    <div class="table-wrapper">
      <table id="responsive-table" v-if="produtos.length > 0">
        <thead>
          <tr>
            <th class="size1">Título</th>
            <th class="size2">Categoria</th>
            <th class="size2">Material</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="produto in produtos"
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
      <div id="no-product-message" v-else>Sem produtos para exibir.</div>
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
      <button @click="mudarPagina(paginaAtual + 1)" class="btn-paginacao">
        Próxima
      </button>
    </div>
  </div>
</template>

<script>
import { ref, inject, watch, onMounted } from "vue";
import axios from "axios";
import { corSelect } from "./../controllers/themeController.js";

export default {
  name: "ProdutoTable",
  setup(props, { emit }) {
    // States reativos
    const produtos = ref([]);
    const paginaAtual = ref(1);
    const itensPorPagina = ref(5);
    const produtoSelecionado = ref(null);
    const totalProdutos = ref(0);
    const totalPaginas = ref(0); // Número total de páginas
    const pesquisaProduto = ref(null);

    const tema = inject("tema");

    watch(tema, (novoTema) => {
      tema.value = novoTema;
    });

    // Métodos
    const cores = (cor) => corSelect(tema.value, cor);

    const mudarPagina = async (pagina) => {
      if (pagina >= 1 && pagina <= totalPaginas.value) {
        paginaAtual.value = pagina;

        if (pesquisaProduto.value) {
          await pesquisarProduto(pesquisaProduto.value); // Realiza a pesquisa ao mudar de página
        } else {
          await obterProdutos(); // Se não houver pesquisa, apenas exibe os produtos
        }
      }
    };

    const atualizar = async () => {
      paginaAtual.value = 1;
    };

    const exibirDetalhes = (produto) => {
      emit("exibir-detalhes", produto);
    };

    const obterProdutos = async () => {
      try {
        const response = await axios.get(
          `https://vl-store.onrender.com/api/produtos/?page=${paginaAtual.value}`
        );
        produtos.value = response.data;
      } catch (error) {
        alert(`Erro ao carregar produtos, tente novamente mais tarde.`);
      }
    };

    const obterTotalProdutos = async () => {
      try {
        const response = await axios.get(
          `https://vl-store.onrender.com/api/produtos/contar`
        );
        totalProdutos.value = response.data.total;
        totalPaginas.value = Math.ceil(
          totalProdutos.value / itensPorPagina.value
        ); // Calculando o total de páginas, aqui erredondei para cima com a função ceil.
      } catch (error) {
        console.log("Erro ao obter o total de produtos.");
      }
    };

    const limparPesquisa = async () => {
      pesquisaProduto.value = null; // Limpa o campo de pesquisa
      mudarPagina(1);
      await obterTotalProdutos(); // Atualiza o total de produtos
      await obterProdutos(); // Exibe todos os produtos novamente
    };

    const pesquisarProduto = async (pesquisa) => {
      if (pesquisa.length >= 3) {
        pesquisaProduto.value = pesquisa;
        try {
          const response = await axios.get(
            `https://vl-store.onrender.com/api/produtos/search/${pesquisa}?page=${paginaAtual.value}&limit=${itensPorPagina.value}`
          );
          produtos.value = response.data.produtos;
          totalProdutos.value = response.data.totalProdutos;
          totalPaginas.value = response.data.totalPaginas;
        } catch (error) {
          produtos.value = "";
          console.error("Erro ao buscar produtos:", error.message);
        }
      } else {
        produtos.value = "";
      }
    };

    onMounted(() => {
      obterProdutos();
      obterTotalProdutos();
    });

    return {
      produtos,
      paginaAtual,
      itensPorPagina,
      produtoSelecionado,
      tema,
      totalProdutos,
      totalPaginas,
      cores,
      mudarPagina,
      exibirDetalhes,
      atualizar,
      pesquisarProduto,
      limparPesquisa,
    };
  },
};
</script>

<style scoped>
.table-pagination-container {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: v-bind(cores(2));
}
.table-wrapper {
  background-color: v-bind(cores(0));
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
#no-product-message {
  width: 100%;
  color: v-bind(cores(2));
  text-align: center;
}

th {
  border-radius: 40px;
  background-color: v-bind(cores(6));
  color: v-bind(cores(14));
}

th:hover {
  background-color: v-bind(cores(11));
  color: v-bind(cores(0));
}

.linha {
  background-color: v-bind(cores(10));
  color: v-bind(cores(15));
}

.linha:hover {
  background-color: v-bind(cores(11));
  color: v-bind(cores(0));
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
#pagination-num {
  color: v-bind(cores(2));
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
  background-color: v-bind(cores(3));
  color: v-bind(cores(9));
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.307);
}

.pagination button:hover {
  background-color: v-bind(cores(21));
  color: v-bind(cores(4));
}
</style>
