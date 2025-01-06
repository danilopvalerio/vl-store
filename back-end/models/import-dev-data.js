const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Produto = require("./produtoModel");
const fs = require("fs");

dotenv.config({ path: "./../.env" });

const DB = process.env.DATABASE.replace(
  "<DB_PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {});
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    process.exit(1);
  }
};

connectDB();

let arquivo = fs.readFileSync("./data.json", "utf-8");

arquivo = JSON.parse(arquivo);

const deleteData = async () => {
  try {
    await Produto.deleteMany();
    console.log("Todos os produtos foram deletados com sucesso.");
  } catch {
    console.log("erroh");
  }
};

const importData = async () => {
  try {
    await Produto.create(arquivo);
    console.log("Todos os produtos foram importados com sucesso.");
  } catch (error) {
    console.log(error);
  }
};

// Se eu rodar no promot: node meuScript.js arg1 arg2
// Os argumentos serão:
// [
//   '/usr/local/bin/node',   // Caminho para o Node.js (no seu sistema)
//   '/caminho/para/meuScript.js', // Caminho para o seu script
//   'arg1',                  // Primeiro argumento
//   'arg2'                   // Segundo argumento
// ]
// Desta forma, consigo escolher a função que quero executar
// através dos argumento

if (process.argv[2] === "importData") {
  importData().then((error) => {
    if (error) {
      console.log(error);
      process.exit();
    }
    console.log("Processo finalizado sem erros.");
    process.exit();
  });
} else if (process.argv[2] === "deleteData") {
  deleteData().then((error) => {
    if (error) {
      console.log(error);
      process.exit();
    }
    console.log("Processo finalizado sem erros.");
    process.exit();
  });
} else {
  console.log("Comando inválido.");
}
