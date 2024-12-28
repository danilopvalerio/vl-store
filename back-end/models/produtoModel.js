const mongoose = require("mongoose");

const variacaoSchema = new mongoose.Schema({
  cor: {
    type: String,
    required: true,
  },
  tamanho: {
    type: String,
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
    min: 0,
  },
  valor: {
    type: Number,
    required: true,
    min: 0,
  },
});

const produtoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  variacoes: [variacaoSchema],
});

module.exports = mongoose.model("Produto", produtoSchema);
