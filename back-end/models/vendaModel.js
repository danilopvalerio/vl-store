const mongoose = require('mongoose');

const vendaSchema = new mongoose.Schema({
    idVenda: {
        type: Number,
        unique: true,
    },
    dataVenda: {
        type: Date,
        required: true,
    },
    horaVenda: {
        type: String,
        required: true,
    },
    funcionario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funcionario', // Referência ao modelo Funcionario
        required: true,
    },
    produtos: [
        {
            produto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Produto', // Referência ao modelo Produto
                required: true,
            },
            quantidade: {
                type: Number,
                required: true,
                min: 1, // Quantidade mínima é 1
            },
        },
    ],
});

module.exports = mongoose.model('Venda', vendaSchema);
