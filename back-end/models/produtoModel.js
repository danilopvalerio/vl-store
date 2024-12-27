const mongoose = require('mongoose');

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
    cor_variacao: {
        type: String,
        required: true,
    },
    tamanho: {
        type: String,
    },
    quantidade: {
        type: Number,
        required: true,
        min: 0,
    },
});

module.exports = mongoose.model('Produto', produtoSchema);
