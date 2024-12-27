const mongoose = require('mongoose');

const caixaSchema = new mongoose.Schema({
    idCaixa: {
        type: Number,
        unique: true,
    },
    responsavel: {
        type: mongoose.Schema.Types.ObjectId, // Referência ao funcionário responsável
        ref: 'Funcionario',
        required: true,
    },
    saldoInicial: {
        type: mongoose.Schema.Types.Decimal128, // Decimal com precisão para valores monetários
        required: true,
    },
    saidaTotal: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
    },
    valeTotal: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
    },
    entradaTotal: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
    },
    horarioAbertura: {
        type: String, // Pode ser um `Date` se preferir um registro mais detalhado
        required: true,
    },
    horarioFechamento: {
        type: String, // Pode ser um `Date` se preferir um registro mais detalhado
        required: true,
    },
    saldoTotal: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
    },
    vendas: [
        {
            type: mongoose.Schema.Types.ObjectId, // Referência à venda
            ref: 'Venda',
        },
    ],
});

module.exports = mongoose.model('Caixa', caixaSchema);
