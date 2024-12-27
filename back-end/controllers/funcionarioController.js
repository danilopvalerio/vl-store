const Funcionario = require('../models/funcionarioModel');

exports.criarFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.create(req.body);
        res.status(201).json({
            status: 'success',
            funcionarioAdicionado: funcionario,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.lerFuncionarios = async (req, res) => {
    try {
        const funcionarios = await Funcionario.find().populate('cargo');
        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.lerFuncionarioPorID = async (req, res) => {
    try {
        const { id } = req.params;
        const funcionario = await Funcionario.findOne({ idFuncionario: id }).populate('cargo');
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado!' });
        }
        res.status(200).json({
            status: 'success',
            funcionario: funcionario,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o funcionário.', error });
    }
};

exports.atualizarFuncionario = async (req, res) => {
    try {
        const { id } = req.params;
        const funcionario = await Funcionario.findOneAndUpdate(
            { idFuncionario: id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
        res.status(200).json({
            status: 'success',
            funcionarioAtualizado: funcionario,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removerFuncionario = async (req, res) => {
    try {
        const { id } = req.params;
        const funcionario = await Funcionario.findOneAndDelete({ idFuncionario: id });
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
        res.status(200).json({
            message: 'Funcionário removido com sucesso',
            funcionario: funcionario,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
