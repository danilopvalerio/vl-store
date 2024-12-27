const Produto = require('../models/produtoModel');

exports.criarProduto = async (req, res) => {
    try {
        const produto = await Produto.create(req.body);
        res.status(201).json({
            status: 'sucess',
            produtoAdicionado: produto,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.lerProdutos = async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.lerProdutoPorID = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca pelo _id do MongoDB
        const produto = await Produto.findById(id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }

        // Retorna o produto encontrado
        res.status(200).json({
            status: 'sucess',
            produto: produto,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o produto.', error });
    }
};

exports.atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;

        const produto = await Produto.findByIdAndUpdate(
            id, // Filtro pelo _id
            req.body, // Dados para atualizar
            { new: true, runValidators: true } // Retorna o documento atualizado e valida os dados
        );
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json({
            status: 'sucess',
            produtoAtualizado: produto,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removerProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByIdAndDelete(id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json({
            message: 'Produto removido com sucesso',
            produto: produto,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
