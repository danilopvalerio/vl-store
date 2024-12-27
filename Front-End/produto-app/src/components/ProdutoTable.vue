<template>
    <div class="container" :style="{ backgroundColor: this.paleta[0] }">
        <h1>Produtos</h1>

        <!-- Barra de Pesquisa -->
        <div class="barra-pesquisa-container">
            <input
                v-model="pesquisa"
                type="text"
                placeholder="Pesquisar produto..."
                class="barra-pesquisa"
            />
            <button
                @click="pesquisarProduto"
                class="btn"
                style="margin-right: 40px"
            >
                Pesquisar
            </button>
            <button @click="mostrarFormulario" class="btn">
                Adicionar produto
            </button>
            <button @click="limparPesquisa" class="btn">Limpar</button>
        </div>

        <div class="table-wrapper">
            <table id="responsive-table">
                <thead class="colunas">
                    <tr class="tr-coluna">
                        <th class="size1">Título</th>
                        <th class="size2">Cor</th>
                        <th class="size3">Tamanho</th>
                        <th class="size3">Quantidade</th>
                        <th class="size3">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="produto in produtosFiltrados"
                        :key="produto._id"
                        class="linha"
                        @click="exibirProduto(produto)"
                        :class="{
                            selecionado:
                                produtoSelecionado &&
                                produtoSelecionado._id === produto._id,
                        }"
                    >
                        <td>
                            {{
                                produto.titulo +
                                ' | ' +
                                produto.categoria +
                                ' | ' +
                                produto.material
                            }}
                        </td>
                        <td>{{ produto.cor_variacao }}</td>
                        <td>{{ produto.tamanho || 'N/A' }}</td>
                        <td>{{ produto.quantidade }}</td>
                        <td>{{ produto.quantidade }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination">
            <button
                @click="mudarPagina(paginaAtual - 1)"
                :disabled="paginaAtual === 1"
                class="btn-paginacao"
                :style="{
                    backgroundColor: this.paleta[4],
                    color: this.paleta[0],
                }"
            >
                Anterior
            </button>
            <span id="pagination-num">{{ paginaAtual }}</span>
            <button
                @click="mudarPagina(paginaAtual + 1)"
                :disabled="paginaAtual === totalPaginas"
                class="btn-paginacao"
                :style="{
                    backgroundColor: this.paleta[4],
                    color: this.paleta[0],
                }"
            >
                Próxima
            </button>
        </div>

        <div
            class="overlay"
            v-if="exibirFormulario"
            @click="mostrarFormulario"
            :style="{ backgroundColor: this.paleta[7] }"
        ></div>
        <div class="form-pop-up" v-if="exibirFormulario">
            <ProductForm :paleta="this.paleta" @fechar="fecharPopUp" />
        </div>
    </div>
</template>

<style scoped>
* {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.288); /* Sombra no texto */
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    font-family: 'Arial', sans-serif;
    height: 100%;
}

h1 {
    color: v-bind(cor3);
    text-align: center;
    margin-bottom: 20px;
}

.barra-pesquisa-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    width: 90%;
}

.barra-pesquisa {
    width: 50%;
    padding: 10px;
    border-radius: 30px;
    font-size: 13px;
    background-color: v-bind(cor0);
    color: v-bind(cor2);
    border: 1px solid v-bind(cor6);
}

.barra-pesquisa:focus {
    border-color: v-bind(
        cor6
    ); /* Exemplo de mudança na borda quando estiver em foco */
    outline: none;
    background-color: v-bind(cor1); /* Exemplo de mudança no fundo */
}

.btn {
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 13;
    background-color: v-bind(cor4);
    color: v-bind(cor0);
}

.btn:hover {
    background-color: v-bind(cor6);
}

.table-wrapper {
    margin: 0 auto;
    max-height: 400px;
    min-height: 200px;
    width: 100%;
    margin-bottom: 20px;
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

th {
    border-radius: 40px;
    font-weight: 500;
    background-color: v-bind(cor6);
    color: v-bind(cor3);
}

th:hover {
    background-color: v-bind(cor4);
    color: v-bind(cor0);
}

.linha {
    background-color: v-bind(cor1);
    color: v-bind(cor3);
}

.linha:hover {
    background-color: v-bind(cor4);
    color: v-bind(cor0);
    font-weight: 500;
    cursor: pointer;
}

.linha.selecionado {
    background-color: v-bind(cor4); /* Cor para indicar seleção */
    color: v-bind(cor0); /* Cor do texto quando selecionado */
}

th.size1 {
    width: 200px; /* Definir o tamanho desejado */
}

th.size2 {
    width: 120px;
}

th.size3 {
    width: 80px;
}

th.size4 {
    width: 50px;
}

.btn-acao {
    border: none;
    background: none;
}
.btn-acao:hover {
    background-color: v-bind(cor0);
    border-radius: 10px;
    cursor: pointer;
}
.buttons-td {
    text-overflow: clip; /* Adicionando '...' quando o texto for muito grande */
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
#pagination-num {
    color: v-bind(2);
}
.pagination button {
    padding: 8px 16px;
    margin: 0 10px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 15px;
    transition: background-color 0.3s;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
}

.form-pop-up {
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 10px;
    z-index: 1001;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<script>
import axios from 'axios';
import ProductForm from './ProductForm.vue';

export default {
    name: 'ProdutoTable',
    data() {
        return {
            produtos: [],
            paginaAtual: 1,
            itensPorPagina: 5,
            pesquisa: '', // Variável para pesquisa
            pesquisaSubmit: '', // Variável que será utilizada na função de pesquisa
            exibirFormulario: false,
            exibicaoDetalhada: false,

            cor0: this.paleta[0],
            cor1: this.paleta[1],
            cor2: this.paleta[2],
            cor3: this.paleta[3],
            cor4: this.paleta[4],
            cor5: this.paleta[5],
            cor6: this.paleta[6],
            cor7: this.paleta[7],

            produtoSelecionado: null,
            //Branco, preto, azul acinzentado escuro
            //verde claro//
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
                    produto.cor_variacao
                        .toLowerCase()
                        .includes(termoPesquisa) ||
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
        mostrarFormulario() {
            this.exibirFormulario = !this.exibirFormulario;
        },
        obterProdutos() {
            axios
                .get('http://localhost:5000/api/produtos')
                .then((response) => {
                    this.produtos = response.data;
                })
                .catch((error) => {
                    console.error('Erro ao obter produtos:', error);
                });
        },

        mudarPagina(pagina) {
            if (pagina >= 1 && pagina <= this.totalPaginas) {
                this.paginaAtual = pagina;
            }
        },
        pesquisarProduto() {
            this.pesquisaSubmit = this.pesquisa;
            this.paginaAtual = 1; // Resetar para a primeira página ao pesquisar
        },
        limparPesquisa() {
            this.pesquisa = ''; // Limpar o campo de entrada
            this.pesquisaSubmit = ''; // Resetar a pesquisa ativa
            this.paginaAtual = 1; // Retornar à primeira página
        },
        fecharPopUp() {
            this.mostrarFormulario();
        },
        exibirProduto() {
            this.exibicaoDetalhada = !this.exibicaoDetalhada;
            alert('eae');
        },
    },
    components: {
        ProductForm,
    },
    props: {
        paleta: {
            type: Array,
            required: true,
        },
    },
};
</script>
