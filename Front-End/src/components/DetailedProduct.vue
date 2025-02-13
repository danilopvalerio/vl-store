<template>
  <div class="container-det">
    <transition>
      <ProductForm
        v-if="mostrarEditar"
        :produtoEditar="produto"
        :temaNum="tema"
        @fechar="fecharEditar"
      />
    </transition>

    <div v-if="!mostrarEditar" class="sub-container-det">
      <div class="text-block">
        <h2 v-if="produto.genero !== 'nenhum'">
          {{ produto.titulo + " - " + produto.genero }}
        </h2>
        <h2 v-else>
          {{ produto.titulo + " - " + produto.genero }}
        </h2>
      </div>
      <div class="main-data-group">
        <label>Categoria: {{ produto.categoria }}</label>
        <label>Material: {{ produto.material }}</label>
        <label>Total geral em estoque: {{ contaTotal }}</label>
        <label>Referência do produto: {{ produto.ref }}</label>
      </div>
      <div class="text-block-smaller">
        <h3>Variações do produto</h3>
      </div>
      <div class="variacao-container-det">
        <div
          v-for="(item, index) in produto.variacoes"
          :key="index"
          class="variacao-item"
        >
          <label>Variação: {{ item.variacao }}</label>
          <label>Quantidade: {{ item.quantidade }}</label>
          <label>Valor: {{ item.valor }}</label>
        </div>
      </div>
      <footer>
        <button @click="$emit('fechar')">Fechar</button>
        <button @click="deletarProduto">Deletar</button>
        <button @click="exibirEditar">Editar</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  text-shadow: none;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/* container-det principal */
.container-det {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  width: 100%;
  height: 80%;
  max-width: 700px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sub-container-det {
  background-color: v-bind(cores(8));
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 15px v-bind(cores(17));
  border-radius: 40px 40px 10px 10px;
  color: v-bind(cores(2));
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Estilo dos títulos */
h2,
h3 {
  width: auto;
  font-size: 19px;
  color: v-bind(cores(7));
  text-align: center;
}
header {
  background-color: v-bind(cores(4));
  width: 100%;
  height: 50px;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Estilo dos rótulos */
.main-data-group label,
.variacao-item label {
  font-size: 15px;
  color: v-bind(cores(2));
  display: block;
  margin: 5px 0;
}

/* Estilo do grupo de dados principais */
.main-data-group {
  margin: 20px 0px 2p;
  width: 90%;
  padding: 20px;
  background-color: v-bind(cores(18));
  border-radius: 8px;
  box-shadow: 0 4px 10px v-bind(cores(17));
  margin-bottom: 20px;
}
.variacao-container-det {
  background-color: none;
  width: 95%;
  height: 300px;
  max-height: 400px;
  overflow-y: scroll;
  scroll-padding: 10px;
  border-radius: 10px;
}

.variacao-container-det::-webkit-scrollbar {
  width: 10px;
  background-color: v-bind(cores(4));
  border-radius: 10px;
}
.variacao-container-det::-webkit-scrollbar-thumb {
  background-color: v-bind(cores(0));
  border-radius: 10px;
  width: 15px;
}
.variacao-item {
  margin: 10px 10px 10px 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  background-color: v-bind(cores(18));
  height: 120px;
  border-radius: 15px;
  box-shadow: 2px 2px 4px v-bind(cores(17));
}

.variacao-item:hover {
  background-color: v-bind(cores(19));
}

footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  margin: 10px;
}
footer button {
  color: v-bind(cores(20));
  height: 40px;
  background-color: v-bind(cores(4));
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  box-sizing: border-box; /* Garante que a borda fique dentro do botão */
}
footer button:hover {
  cursor: pointer;
  background-color: v-bind(cores(9));
  color: v-bind(cores(4));
  box-shadow: 2px 2px 4px v-bind(cores(17)); /* Sombra no texto */
}
</style>

<script>
import { ref, computed, watch, inject } from "vue";
import axios from "axios";
import { corSelect } from "@/controllers/themeController";
import ProductForm from "./ProductForm.vue";

export default {
  name: "DetailedProduct",
  props: {
    produto: {
      type: Object,
      required: true,
      default: () => ({
        ref: "",
        titulo: "",
        categoria: "",
        material: "",
        genero: "",
        variacoes: [],
      }),
    },
  },
  setup(props, { emit }) {
    const mostrarEditar = ref(false);

    const tema = inject("tema");

    watch(tema, (novoTema) => {
      tema.value = novoTema;
    });

    // Métodos
    const cores = (cor) => corSelect(tema.value, cor);

    const fecharEditar = () => {
      mostrarEditar.value = false;
    };

    const exibirEditar = () => {
      mostrarEditar.value = true;
    };

    const deletarProduto = async () => {
      try {
        const response = await axios.delete(
          `https://vl-store.onrender.com/api/produtos/${props.produto._id}`
        );
        console.log("Produto deletado com sucesso:", response.data);
        emit("produto-deletado");
        emit("fechar");
      } catch (error) {
        console.error(
          "Erro ao deletar o produto:",
          error.response || error.message
        );
        alert("Erro ao deletar o produto. Tente novamente.");
      }
    };

    const contaTotal = computed(() => {
      return props.produto.variacoes.reduce(
        (total, variacao) => total + variacao.quantidade,
        0
      );
    });

    return {
      tema,
      mostrarEditar,
      fecharEditar,
      exibirEditar,
      deletarProduto,
      contaTotal,
      cores,
    };
  },
  components: {
    ProductForm,
  },
};
</script>
