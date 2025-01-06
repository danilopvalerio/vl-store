<template>
  <div class="container">
    <HeaderPanel :temaNum="tema" />
    <h1>Produtos</h1>

    <div
      class="overlay"
      v-if="exibirFormulario || exibicaoDetalhada"
      @click="fecharJanelas"
    ></div>
    <SearchBar
      :temaNum="tema"
      @pesquisar="pesquisarProduto"
      @mostrarFormulario="mostrarFormulario"
      @limparPesquisa="limparPesquisa"
    />

    <ProductTable
      ref="productTable"
      :temaNum="tema"
      @exibir-detalhes="abrirDetalhes"
    />

    <ProductForm
      v-if="exibirFormulario"
      :temaNum="tema"
      @fechar="fecharJanelas"
    />

    <DetailedProduct
      ref="detailedProduct"
      v-if="exibicaoDetalhada"
      :produto="produtoSelecionado"
      @fechar="fecharJanelas"
      :temaNum="tema"
      @produto-deletado="atualizarTabela"
    />
    <FooterPanel :paleta="tema" :temaNum="tema" />
  </div>
</template>

<style scoped>
.container {
  background-color: v-bind(cores(tema, 0));
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
}

h1 {
  color: v-bind(cores(tema, 2));
  text-align: center;
  margin-bottom: 20px;
}

.overlay {
  background-color: rgba(72, 72, 72, 0.164);
  backdrop-filter: blur(30px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
</style>

<script>
import { ref, defineComponent } from "vue";
import ProductForm from "./ProductForm.vue";
import ProductTable from "./ProductTable.vue";
import SearchBar from "./SearchBar.vue";
import { corSelect } from "./../controllers/themeController.js";
import HeaderPanel from "./common/HeaderPanel.vue";
import DetailedProduct from "./DetailedProduct.vue";
import FooterPanel from "./common/FooterPanel.vue";

export default defineComponent({
  name: "ProdutoTable",
  components: {
    ProductForm,
    ProductTable,
    HeaderPanel,
    FooterPanel,
    SearchBar,
    DetailedProduct,
  },
  props: {
    temaNum: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const tema = ref(props.temaNum);
    const produtos = ref([]);
    const paginaAtual = ref(1);
    const itensPorPagina = ref(5);
    const pesquisa = ref("");
    const pesquisaSubmit = ref("");
    const exibirFormulario = ref(false);
    const exibicaoDetalhada = ref(false);
    const produtoSelecionado = ref(null);

    const productTable = ref(null);
    const detailedProduct = ref(null);

    const cores = (tema, cor) => {
      return corSelect(tema, cor);
    };

    const pesquisarProduto = (e) => {
      if (productTable.value) {
        productTable.value.pesquisarProduto(e);
      }
    };

    const limparPesquisa = () => {
      if (productTable.value) {
        productTable.value.limparPesquisa();
      }
    };

    const atualizarTabela = () => {
      if (productTable.value) {
        productTable.value.atualizar();
      }
    };

    const abrirDetalhes = (produto) => {
      produtoSelecionado.value = produto;
      exibicaoDetalhada.value = true;
    };

    const fecharJanelas = () => {
      exibicaoDetalhada.value = false;
      exibirFormulario.value = false;
      produtoSelecionado.value = null;
      atualizarTabela();
    };

    const mostrarFormulario = () => {
      exibicaoDetalhada.value = false;
      exibirFormulario.value = true;
    };

    return {
      tema,
      produtos,
      paginaAtual,
      itensPorPagina,
      pesquisa,
      pesquisaSubmit,
      exibirFormulario,
      exibicaoDetalhada,
      produtoSelecionado,
      cores,
      pesquisarProduto,
      limparPesquisa,
      atualizarTabela,
      abrirDetalhes,
      fecharJanelas,
      mostrarFormulario,

      // Ref's dos componentes
      productTable,
      detailedProduct,
    };
  },
});
</script>
