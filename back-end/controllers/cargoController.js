const Cargo = require('../models/cargoModel');

exports.criarCargo = async (req, res) => {
    try {
        const cargo = await Cargo.create(req.body);
        res.status(201).json({
            status: 'success',
            cargoAdicionado: cargo,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.lerCargos = async (req, res) => {
    try {
        const cargos = await Cargo.find();
        res.status(200).json(cargos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.lerCargoPorID = async (req, res) => {
    try {
        const { id } = req.params;
        const cargo = await Cargo.findOne({ _id: id });
        if (!cargo) {
            return res.status(404).json({ message: 'Cargo não encontrado!' });
        }
        res.status(200).json({
            status: 'success',
            cargo: cargo,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o cargo.', error });
    }
};

exports.atualizarCargo = async (req, res) => {
    try {
        const { id } = req.params;
        const cargo = await Cargo.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!cargo) {
            return res.status(404).json({ message: 'Cargo não encontrado' });
        }
        res.status(200).json({
            status: 'success',
            cargoAtualizado: cargo,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removerCargo = async (req, res) => {
    try {
        const { id } = req.params;
        const cargo = await Cargo.findOneAndDelete({ _id: id });
        if (!cargo) {
            return res.status(404).json({ message: 'Cargo não encontrado' });
        }
        res.status(200).json({
            message: 'Cargo removido com sucesso',
            cargo: cargo,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
