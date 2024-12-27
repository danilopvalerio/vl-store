const Caixa = require('../models/caixaModel');

exports.criarCaixa = async (req, res) => {
    try {
        const caixa = await Caixa.create(req.body);
        res.status(201).json({
            status: 'success',
            caixaCriado: caixa,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.lerCaixas = async (req, res) => {
    try {
        const caixas = await Caixa.find().populate('responsavel vendas');
        res.status(200).json(caixas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.lerCaixaPorID = async (req, res) => {
    try {
        const { id } = req.params;
        const caixa = await Caixa.findOne({ idCaixa: id }).populate(
            'responsavel vendas'
        );
        if (!caixa) {
            return res.status(404).json({ message: 'Caixa não encontrado!' });
        }
        res.status(200).json({
            status: 'success',
            caixa: caixa,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o caixa.', error });
    }
};

exports.atualizarCaixa = async (req, res) => {
    try {
        const { id } = req.params;
        const caixa = await Caixa.findOneAndUpdate({ idCaixa: id }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!caixa) {
            return res.status(404).json({ message: 'Caixa não encontrado' });
        }
        res.status(200).json({
            status: 'success',
            caixaAtualizado: caixa,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removerCaixa = async (req, res) => {
    try {
        const { id } = req.params;
        const caixa = await Caixa.findOneAndDelete({ idCaixa: id });
        if (!caixa) {
            return res.status(404).json({ message: 'Caixa não encontrado' });
        }
        res.status(200).json({
            message: 'Caixa removido com sucesso',
            caixa: caixa,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
