const express = require("express");
const {
  criarProduto,
  lerProdutos,
  atualizarProduto,
  removerProduto,
  lerProdutoPorID,
  verificaRef,
  contarProdutos,
  searchProdutos,
} = require("../controllers/produtoController");

const router = express.Router();

// Nova rota adicionada antes da rota com :id
router.route("/contar").get(contarProdutos);

router.route("/").get(lerProdutos).post(criarProduto);

router.route("/search/:query").get(searchProdutos);

router
  .route("/:id")
  .put(atualizarProduto)
  .delete(removerProduto)
  .get(lerProdutoPorID);

router.route("/verificaRef/:ref").get(verificaRef);

module.exports = router;
