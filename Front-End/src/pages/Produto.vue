<template>
  <div class="container">
    <HeaderPanel :temaNum="tema" />
    <h1>Produtos</h1>
    <transition>
      <div
        class="overlay"
        v-if="exibirFormulario || exibicaoDetalhada"
        @click="fecharJanelas"
      ></div>
    </transition>
    <SearchBar
      :temaNum="tema"
      @pesquisar="pesquisarProduto"
      @mostrarFormulario="mostrarFormulario"
      @limparPesquisa="limparPesquisa"
    />

    <ProductTable ref="productTable" @exibir-detalhes="abrirDetalhes" />
    <transition>
      <ProductForm v-if="exibirFormulario" @fechar="fecharJanelas" />
    </transition>

    <transition>
      <DetailedProduct
        ref="detailedProduct"
        v-if="exibicaoDetalhada"
        :produto="produtoSelecionado"
        @fechar="fecharJanelas"
        @produto-deletado="atualizarTabela"
      />
    </transition>
    <FooterPanel @voltarAoLogin="voltarAoLogin" />
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.container {
  background-color: v-bind(cores(0));
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
}

h1 {
  color: v-bind(cores(2));
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.307);
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
import { ref, defineComponent, inject, watch } from "vue";

import ProductForm from "../components/ProductForm.vue";
import ProductTable from "../components/ProductTable.vue";
import SearchBar from "../components/SearchBar.vue";
import { corSelect } from "../controllers/themeController.js";
import HeaderPanel from "../components/common/HeaderPanel.vue";
import DetailedProduct from "../components/DetailedProduct.vue";
import FooterPanel from "../components/common/FooterPanel.vue";
import { useRouter } from "vue-router";

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
  setup() {
    const produtos = ref([]);
    const paginaAtual = ref(1);
    const itensPorPagina = ref(5);
    const pesquisa = ref("");
    const pesquisaSubmit = ref("");
    const exibirFormulario = ref(false);
    const exibicaoDetalhada = ref(false);
    const produtoSelecionado = ref(null);
    const router = useRouter();
    const productTable = ref(null);
    const detailedProduct = ref(null);

    const tema = inject("tema");

    watch(tema, (novoTema) => {
      tema.value = novoTema;
    });

    const cores = (cor) => corSelect(tema.value, cor);

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

    const voltarAoLogin = () => {
      router.push("/");
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
      voltarAoLogin,

      // Ref's dos componentes
      productTable,
      detailedProduct,
    };
  },
});
</script>
