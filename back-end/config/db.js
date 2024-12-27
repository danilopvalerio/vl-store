const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
    '<DB_PASSWORD>',
    process.env.DATABASE_PASSWORD
);

const connectDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log('Conexão com o banco de dados bem-sucedida.');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
