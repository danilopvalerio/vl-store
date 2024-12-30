const express = require('express');
const {
    criarProduto,
    lerProdutos,
    atualizarProduto,
    removerProduto,
    lerProdutoPorID,
    verificaRef
} = require('../controllers/produtoController');

const router = express.Router();

router.route('/').get(lerProdutos).post(criarProduto);

router
    .route('/:id')
    .put(atualizarProduto)
    .delete(removerProduto)
    .get(lerProdutoPorID);

router
.route('/verificaRef/:ref')
.get(verificaRef);

module.exports = router;
