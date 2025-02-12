const express = require('express');
const router = express.Router();

const productController = require('../controller/product');

router.get('/products', productController.index);
router.get('/product/:id', productController.show);
router.post('/product', productController.store);
router.put('/product/:id', productController.update);
router.delete('/product/:id', productController.delete);

module.exports = router;
