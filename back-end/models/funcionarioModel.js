const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
    idFuncionario: {
        type: Number,
        unique: true,
    },
    nome: {
        type: String,
        required: true,
    },
    cargo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cargo', // Referência ao modelo Produto
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Funcionario', funcionarioSchema);
