// Lista de cores
const cores = [
  [
    "#FFFFFF", // #FFFFFF
    "#F0F0F0", // #F0F0F0
    "#000000", // #000000
    "rgb(195, 0, 78)", //rgb(20, 34, 58)
    "#590728", // #590728
    "#ff5c5c", // #ff5c5c
    "#B5B5B5", // #B5B5B5
    "#4D4D4D4D", // #4D4D4D4D
    "#A4A4A42F", //   #A4A4A42F
  ],
  [
    "#FFFFFF", //rgb(25, 25, 25)
    "#F0F0F0", // #F0F0F0
    "#000000", // #000000
    "#000000", // #590728
    "rgb(195, 0, 78)", // #363F4E
    "#ff5c5c", // #ff5c5c
    "#B5B5B5", // #B5B5B5
    "#4D4D4D4D", // #4D4D4D4D
    "#A4A4A42F", //   #A4A4A42F
  ],
];

// Função que retorna a cor baseada no número
export const corSelect = (tema, num) => {
  return cores[tema][num]; // Ajusta para que 1 seja o primeiro elemento
};