const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('Cargo', cargoSchema);
