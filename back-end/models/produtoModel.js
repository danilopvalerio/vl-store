const mongoose = require("mongoose");

const variacaoSchema = new mongoose.Schema({
  variacao: {
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
  ref: {
    type: String,
    required: true,
  },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: false,
    index: true,
  },
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
  genero: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: false, // Descrição opcional
  },
  variacoes: [variacaoSchema],
});

module.exports = mongoose.model("Produto", produtoSchema);
