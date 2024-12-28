<template>
  <div class="container">
    <HeaderPanel :temaNum="this.tema" />
    <h1>Produtos</h1>
    <!-- <FooterPanel :paleta="tema" /> -->
    <SearchBar
      :temaNum="this.tema"
      @pesquisar="pesquisarProduto"
      @mostrarFormulario="mostrarFormulario"
      @limparPesquisa="limparPesquisa"
    />
    <!-- Referência para poder acessar os métodos deste componente (ref)-->
    <ProductTable
      ref="productTable"
      :temaNum="this.tema"
      @exibir-detalhes="abrirProdutoDetalhado"
    />

    <div
      class="overlay"
      v-if="exibirFormulario || exibicaoDetalhada"
      @click="mostrarFormulario"
    ></div>
    <div class="pop-up" v-if="exibirFormulario">
      <ProductForm :temaNum="this.tema" @fechar="fecharPopUp" />
    </div>

    <div class="pop-up" v-if="exibicaoDetalhada">
      <DetailedProduct
        ref="detailedProduct"
        v-if="exibicaoDetalhada"
        :produto="produtoSelecionado"
        @fechar="fecharDetalhes"
        :temaNum="this.tema"
        @produto-deletado="atualizarTabela"
      />
    </div>
  </div>
</template>

<style scoped>


.container {
  background-color: v-bind(cores(tema, 0));
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  font-family: "Arial", sans-serif;
  height: 100%;
}

h1 {
  color: v-bind(cores(tema, 3));
  text-align: center;
  margin-bottom: 20px;
}

.overlay {
  background-color: rgba(255, 255, 255, 0.419);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.pop-up {
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: none;
}
</style>

<script>
import ProductForm from "./ProductForm.vue";
import ProductTable from "./ProductTable.vue";
import SearchBar from "./SearchBar.vue";
import { corSelect } from "./../controllers/themeController.js";
import HeaderPanel from "./common/HeaderPanel.vue";
import DetailedProduct from "./DetailedProduct.vue";
// import FooterPanel from "./common/FooterPanel.vue";

export default {
  name: "ProdutoTable",
  data() {
    return {
      produtos: [],
      paginaAtual: 1,
      itensPorPagina: 5,
      pesquisa: "", // Variável para pesquisa
      pesquisaSubmit: "", // Variável que será utilizada na função de pesquisa
      exibirFormulario: false,
      exibicaoDetalhada: false,
      produtoSelecionado: null,
      //Branco, preto, azul acinzentado escuro
      //verde claro//
    };
  },
  methods: {
    mostrarFormulario() {
      this.exibirFormulario = !this.exibirFormulario;
    },
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
    atualizarTabela(){
      this.$refs.productTable.atualizar();
    },
    fecharPopUp() {
      this.mostrarFormulario();
    },
    abrirProdutoDetalhado(produto) {
      this.produtoSelecionado = produto;
      this.exibicaoDetalhada = true;
    },
    fecharDetalhes() {
      this.exibicaoDetalhada = false;
      this.produtoSelecionado = null;
    },
  },
  components: {
    ProductForm,
    ProductTable,
    HeaderPanel,
    // FooterPanel,
    SearchBar,
    DetailedProduct,
  },
  props: {
    tema: {
      type: Number,
      required: true,
    },
  },
};
</script>
