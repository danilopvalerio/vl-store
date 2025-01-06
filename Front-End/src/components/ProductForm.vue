<template>
  <div class="form-container">
    <div class="text-block">
      <h2>Cadastro de Produto</h2>
    </div>
    <form>
      <div class="form-group">
        <label for="titulo">Título:</label>
        <input
          id="titulo"
          v-model="produto.titulo"
          type="text"
          name="titulo"
          required
          placeholder="Digite o título..."
        />
      </div>

      <div class="form-group">
        <label for="categoria">Categoria:</label>
        <input
          id="categoria"
          v-model="produto.categoria"
          type="text"
          name="categoria"
          required
          placeholder="Digite a categoria..."
        />
      </div>

      <div class="form-group">
        <label for="material">Material:</label>
        <input
          id="material"
          v-model="produto.material"
          type="text"
          name="material"
          required
          placeholder="Digite o material..."
        />
      </div>
      <div class="form-group">
        <label>Referência:</label>
        <label id="referencia">{{ produto.ref }}</label>

        <label id="genero">Gênero:</label>
        <select
          v-model="produto.genero"
          class="input-menor"
          name="genero"
          required
        >
          <option value="unissex">Unissex</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="infantil-masculino">Infantil - Para Meninos</option>
          <option value="infantil-feminino">Infantil - Para Meninas</option>
          <option value="nenhum">Nenhum</option>
        </select>
      </div>

      <div class="text-block-smaller">
        <h3>Variações de Produto:</h3>
      </div>

      <div class="variacao-container">
        <transition-group>
          <div
            v-for="(item, index) in produto.variacoes"
            :key="index"
            class="variacao-item"
          >
            <div class="variacao-item-entry size1">
              <label for="variacao">Variacao:</label>
              <input
                id="variacao"
                class="size3"
                v-model="item.variacao"
                type="text"
                name="variacao"
                required
                placeholder="Digite a variação, por exemplo: Azul GG"
              />
            </div>

            <div class="variacao-item-entry size2">
              <label for="quantidade">Quantidade</label>
              <input
                id="quantidade"
                class="size1"
                v-model="item.quantidade"
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
                id="valor"
                class="size1"
                v-model="item.valor"
                type="number"
                name="valor"
                required
                min="1"
                step="1"
                placeholder="00"
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
        </transition-group>
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
import { ref, reactive, onMounted } from "vue";
import { corSelect } from "./../controllers/themeController.js";
import axios from "axios";

export default {
  props: {
    temaNum: {
      type: Number,
      required: true,
    },
    produtoEditar: {
      type: Object,
      required: false,
    },
  },
  setup(props, { emit }) {
    const tema = ref(props.temaNum);
    const editar = ref(false);

    const produto = reactive({
      ref: "",
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
    });

    // Verificar se existe um produto para edição
    onMounted(() => {
      if (props.produtoEditar != null) {
        editar.value = true;
        Object.assign(produto, props.produtoEditar);
      } else {
        produto.ref = gerarReferenciaAleatoria();
      }
    });

    const gerarReferenciaAleatoria = () => {
      return Math.floor(1000 + Math.random() * 9999).toString();
    };

    const verificarRefExistente = async (ref) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/produtos/verificarRef/${ref}`
        );
        return response.data.existe;
      } catch (error) {
        console.error("Erro ao verificar referência:", error);
        return false;
      }
    };

    const gerarReferenciaValida = async () => {
      let refValida = false;
      let novaRef;

      while (!refValida) {
        novaRef = gerarReferenciaAleatoria();
        const existe = await verificarRefExistente(novaRef);
        if (!existe) {
          refValida = true;
        }
      }

      produto.ref = novaRef;
    };

    const cores = (tema, cor) => {
      return corSelect(tema, cor);
    };

    const adicionarVariacao = () => {
      produto.variacoes.push({
        variacao: "",
        quantidade: 1,
        valor: 0.01,
        tema: tema.value,
      });
    };

    const removerVariacao = (index) => {
      produto.variacoes.splice(index, 1);
    };

    const salvarProduto = () => {
      if (editar.value) {
        editarProduto();
      } else {
        axios
          .post("http://localhost:5000/api/produtos/", produto)
          .then((response) => {
            console.log(response);
            alert(`Produto criado com sucesso.`);
          })
          .catch((error) => {
            alert(`Erro ao criar o produto: ${error}`);
          });
        fecharFormulario();
      }
    };

    const editarProduto = () => {
      axios
        .put(`http://localhost:5000/api/produtos/${produto._id}`, produto)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert("Erro ao editar o produto:", error);
        });
      fecharFormulario(produto);
    };

    const fecharFormulario = (produtoFinal = null) => {
      limparEntradas();
      emit("fechar", produtoFinal);
    };

    const limparEntradas = () => {
      produto.titulo = "";
      produto.categoria = "";
      produto.material = "";
      produto.genero = "unissex"; // Resetando o valor de gênero
      produto.variacoes = [
        {
          variacao: "",
          quantidade: "",
          valor: "",
        },
      ];
    };

    return {
      tema,
      produto,
      editar,
      adicionarVariacao,
      gerarReferenciaValida,
      cores,
      removerVariacao,
      salvarProduto,
      fecharFormulario,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.v-enter-active,
.v-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
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
  align-items: center;
}

input,
select,
#referencia {
  color: v-bind(cores(tema, 2));
}

form {
  padding: 0px 10px;
  border-radius: 10px;
  width: 95%;
  height: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

h2,
h3 {
  font-size: 18px;
  color: v-bind(cores(tema, 2));
  text-align: center;
}

.form-group {
  box-sizing: border-box;
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  height: 40px;
}

.form-group label {
  min-width: 15%;
  width: 15%;
  text-align: right;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-right: 20px;
}

.form-group input,
select,
#referencia {
  outline: none;
  height: 30px;
  border: none;
  background-color: v-bind(cores(tema, 8));
  border-radius: 15px;
  border: 1px solid v-bind(cores(tema, 22));
  padding: 5px 10px;
  box-shadow: 2px 2px 4px v-bind(cores(tema, 22));
}

.form-group input {
  width: 85%;
}

#referencia {
  width: 30%;
}

#genero {
  min-width: 10%;
  width: 5%;
}

select {
  width: 15%;
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
  justify-content: center;
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
  background-color: v-bind(cores(tema, 8));
  border-radius: 15px;
  border: 1px solid v-bind(cores(tema, 22));
  padding: 5px;
  box-shadow: 2px 2px 4px v-bind(cores(tema, 22));
  text-align: center;
}

.variacao-item button {
  background-color: v-bind(cores(tema, 5));
  /* Cor de fundo vermelha */
  color: v-bind(cores(tema, 0));
  /* Cor do texto (o 'X') */
  border: none;
  border-radius: 50%;
  /* Deixa o botão redondo */
  width: 30px;
  /* Largura fixa */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px 15px;
  font-size: 18px;
  /* Tamanho do 'X' */
  transition: background-color 0.3s ease;
  /* Efeito de transição suave na cor de fundo */
  margin-right: 10px;
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
  box-sizing: border-box;
  /* Garante que a borda fique dentro do botão */
}

.form-close-save button:hover {
  cursor: pointer;
  background-color: v-bind(cores(tema, 0));
  color: v-bind(cores(tema, 4));
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.307);
  /* Sombra no texto */
}

@media (max-width: 600px) {
  .variacao-item input {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
