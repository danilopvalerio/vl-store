const express = require('express');
const {
    criarProduto,
    lerProdutos,
    atualizarProduto,
    removerProduto,
    lerProdutoPorID
} = require('../controllers/produtoController');

const router = express.Router();

router.route('/').get(lerProdutos).post(criarProduto);

router
    .route('/:id')
    .put(atualizarProduto)
    .delete(removerProduto)
    .get(lerProdutoPorID);

module.exports = router;
