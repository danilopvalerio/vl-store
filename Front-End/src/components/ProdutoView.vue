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
import ProductForm from "./ProductForm.vue";
import ProductTable from "./ProductTable.vue";
import SearchBar from "./SearchBar.vue";
import { corSelect } from "./../controllers/themeController.js";
import HeaderPanel from "./common/HeaderPanel.vue";
import DetailedProduct from "./DetailedProduct.vue";
import FooterPanel from "./common/FooterPanel.vue";

export default {
  name: "ProdutoTable",
  data() {
    return {
      tema: this.temaNum,
      produtos: [],
      paginaAtual: 1,
      itensPorPagina: 5,
      pesquisa: "",
      pesquisaSubmit: "",
      exibirFormulario: false,
      exibicaoDetalhada: false,
      produtoSelecionado: null,
    };
  },
  methods: {
    cores(tema, cor) {
      return corSelect(tema, cor);
    },
    mudarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaAtual = pagina;
      }
    },
    pesquisarProduto(e) {
      this.$refs.productTable.pesquisarProduto(e);
    },
    limparPesquisa() {
      this.$refs.productTable.limparPesquisa();
    },
    atualizarTabela() {
      this.$refs.productTable.atualizar();
    },
    fecharPopUp() {
      this.mostrarFormulario();
    },
    abrirDetalhes(produto) {
      this.produtoSelecionado = produto;
      this.exibicaoDetalhada = true;
    },
    fecharJanelas() {
      this.exibicaoDetalhada = false;
      this.exibirFormulario = false;
      this.produtoSelecionado = null;
    },
    mostrarFormulario() {
      this.exibicaoDetalhada = false;
      this.exibirFormulario = true;
    },
  },
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
};
</script>
