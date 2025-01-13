<template>
  <div class="container">
    <HeaderPanel :temaNum="tema" />

    <div class="login-container">
      <h1>Login</h1>
      <form>
        <div class="entries-field">
          <div class="form-item">
            <label>Usuário</label>
            <Input type="text" />
          </div>
          <div class="form-item">
            <label>Senha</label>
            <Input type="password" />
          </div>
        </div>
        <button>Recuperar senha</button>
        <button>Entrar</button>
      </form>
    </div>

    <transition>
      <div
        class="overlay"
        v-if="exibirFormulario || exibicaoDetalhada"
        @click="fecharJanelas"
      ></div>
    </transition>

    <FooterPanel :paleta="tema" :temaNum="tema" />
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.container {
  background-color: v-bind(cores(tema, 4));
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
}

h1 {
  color: v-bind(cores(tema,4));
  text-align: center;
  margin-bottom: 0;
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

.login-container {
  background-color: v-bind(cores(tema, 0));
  border-radius: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 450px;
  border: 1px solid v-bind(cores(tema, 22));
  box-shadow: 2px 2px 4px v-bind(cores(tema, 2));
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 80%;
}

.entries-field {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.form-item {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-item label {
  width: 20%;
  text-align: right;
  margin-right: 15px;
  color: v-bind(cores(tema, 4));
}

input {
  outline: none;
  width: 70%;
  height: 30px;
  border: none;
  background-color: white;
  border-radius: 15px;
  padding: 5px 10px;
  border: 1px solid v-bind(cores(tema, 22));
  box-shadow: 2px 2px 4px v-bind(cores(tema, 22));
}

button {
  background-color: v-bind(cores(tema, 0));
  color: v-bind(cores(tema, 4));
  padding: 10px 10px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  border: 1px solid v-bind(cores(tema, 22));
  box-shadow: 2px 2px 4px v-bind(cores(tema, 22));
  transition: background-color 0.3s, border-color 0.3s;
  box-sizing: border-box;
  width: 150px;
}

button:hover {
  color: v-bind(cores(tema, 20));
  background-color: v-bind(cores(tema, 4));
  color: v-bind(cores(tema, 4));
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.307);
  /* Sombra no texto */
}
</style>

<script>
import { ref, defineComponent, inject } from "vue";
import { corSelect } from "./../controllers/themeController.js";
import HeaderPanel from "./common/HeaderPanel.vue";
import FooterPanel from "./common/FooterPanel.vue";

export default defineComponent({
  name: "ProdutoTable",
  components: {
    HeaderPanel,
    FooterPanel,
  },
  props: {
    temaNum: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const tema = inject("tema");
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
