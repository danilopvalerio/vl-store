// Importamos o express para fazer o back-end.
const express = require('express');
const cors = require('cors');

// Importamos o dotenv para realizar ler o arquivo .env e realizar a conexão com o database
const dotenv = require('dotenv');

// Importamos o arquivo de rotas
const produtoRoutes = require('./routes/produtos');

//Realizamos a conexão com o database
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
// Usamos um middleware para ter acesso ao corpo das requisições como jsoon
app.use(express.json());

// Definimos a roda produtos, na qual teremos a url /api/produtos/ para acessar produtos gerais e /api/produtos/:id para acessar produtos específicos.
app.use('/api/produtos', produtoRoutes);

//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
