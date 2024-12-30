// Lista de cores
const cores = [
  [
    "rgb(245, 250, 255)", //fundo geral
    "rgb(238, 250, 255)", //fundo da barra de pesquisa
    "rgb(0, 0, 0)", //H1 da tela principal e textos dos detalhes
    "rgb(26, 44, 79)", //Botões tela principal e cor do texto das linhas tabela
    "rgb(26, 44, 79)", //fundo dos headers e footes todos da tela principal
    "rgb(255, 0, 0)", //fundo do botão de X
    "rgb(26, 44, 79)", //fundo da linha das colunas
    "rgb(0, 0, 0)", //h1 e h2 das subjanelas
    "rgba(255, 255, 255, 0.46)", //Fundo de adicionar, editar e exibir produto
    "rgb(255, 255, 255)", //cor do texto dos botões da tela inicial
    "rgb(222, 240, 255)", //Fundo das linhas da tabela menos da linha de coluna
    "rgb(0, 17, 41)", //Fundo ao passar o mouse nas linhas da tabela
    "rgb(189, 189, 189)", //Borda da barra de pesquisa
    "rgb(189, 189, 189)", //Borda dos inputs de adicionar/editar produto
    "rgb(255, 255, 255)", //Cor do texto das colunas
    "rgb(26, 44, 79)", //Cor do texto das linhas menos coluna
    "rgba(0, 0, 0, 0.319)", //Sombras da tabela
    "rgba(0, 0, 0, 0.319)", //Sombras das janelas
    "rgba(255, 255, 255, 0.56)", //Fundo transparente da variação de item
    "rgb(255, 255, 255)", //Hover variação
    "rgb(255, 255, 255)", //Cor texto botões inferiores das janelas
    "rgb(222, 240, 255)", //Cor do botão da barra de pesquisa ao passar o mouse
    "rgba(0, 0, 0, 0.41)", //Sombra dos inputs
  ],
  [
    "rgb(30, 31, 33)", //fundo geral
    "rgb(59, 61, 66)", //fundo da barra de pesquisa
    "rgb(255, 255, 255)", //H1 da tela principal e textos dos detalhes
    "rgb(59, 61, 66)", //Botões tela principal e cor do texto das linhas tabela
    "rgb(21, 21, 22)", //fundo dos headers e footes todos da tela principal
    "rgb(255, 0, 0)", //fundo do botão de X
    "rgb(21, 21, 22)", //fundo da linha das colunas
    "rgb(255, 255, 255)", //h1 e h2 das subjanelas
    "rgba(30, 30, 30, 0.46)", //Fundo de adicionar, editar e exibir produto
    "rgb(255, 255, 255)", //cor do texto dos botões da tela inicial
    "rgb(60, 63, 71)", //Fundo das linhas da tabela menos da linha de coluna
    "rgb(255, 255, 255)", //Fundo ao passar o mouse nas linhas da tabela
    "rgb(0, 0, 0)", //Borda da barra de pesquisa
    "rgb(77, 77, 77)", //Borda dos inputs de adicionar/editar produto
    "rgb(255, 255, 255)", //Cor do texto das colunas
    "rgb(255, 255, 255)", //Cor do texto das linhas menos coluna
    "rgba(0, 0, 0, 0.64)", //Sombras da tabela
    "rgb(0, 0, 0)", //Sombras das janelas
    "rgba(0, 0, 0, 0.11)", //Fundo transparente da variação de item
    "rgb(0, 0, 0)", //Hover variação
    "rgb(255, 255, 255)", //Cor texto botões inferiores das janelas
    "rgb(255, 255, 255)", //Cor do botão da barra de pesquisa ao passar o mouse
    "rgba(0, 0, 0, 0.41)", //Sombra dos inputs
  ],
];

// Função que retorna a cor baseada no número
export const corSelect = (tema, num) => {
  return cores[tema][num]; // Ajusta para que 1 seja o primeiro elemento
};
