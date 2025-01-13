const express = require("express");

// Usamos o cors para permitir requisições de domínios diferentes.
const cors = require("cors");

const produtoRoutes = require("./routes/produtos");

const connectDB = require("./config/db");

const app = express();
connectDB();

// Habilita o CORS para permitir requisições de diferentes origens
app.use(cors());

// Para que o body da requisição possa ser utilizado como um objeto json
app.use(express.json());

// Define a rota principal para produtos, prefixada por "/api/produtos"
app.use("/api/produtos", produtoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
