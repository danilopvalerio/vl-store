const Venda = require('../models/vendaModel');

exports.criarVenda = async (req, res) => {
    try {
        const venda = await Venda.create(req.body);
        res.status(201).json({
            status: 'success',
            vendaAdicionada: venda,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.lerVendas = async (req, res) => {
    try {
        const vendas = await Venda.find().populate('funcionario produtos.produto');
        res.status(200).json(vendas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.lerVendaPorID = async (req, res) => {
    try {
        const { id } = req.params;
        const venda = await Venda.findOne({ idVenda: id }).populate('funcionario produtos.produto');
        if (!venda) {
            return res.status(404).json({ message: 'Venda não encontrada!' });
        }
        res.status(200).json({
            status: 'success',
            venda: venda,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar a venda.', error });
    }
};

exports.atualizarVenda = async (req, res) => {
    try {
        const { id } = req.params;
        const venda = await Venda.findOneAndUpdate(
            { idVenda: id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!venda) {
            return res.status(404).json({ message: 'Venda não encontrada' });
        }
        res.status(200).json({
            status: 'success',
            vendaAtualizada: venda,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removerVenda = async (req, res) => {
    try {
        const { id } = req.params;
        const venda = await Venda.findOneAndDelete({ idVenda: id });
        if (!venda) {
            return res.status(404).json({ message: 'Venda não encontrada' });
        }
        res.status(200).json({
            message: 'Venda removida com sucesso',
            venda: venda,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
