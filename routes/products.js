const express = require('express');
const router = express.Router();
const productController = require('../Controllers/ProductController');
// chua xu ly xong
router.post('/add', productController.addProduct);
//
router.get('/product-description/:id', productController.categorySlug);
router.get('/product/:slug', productController.slugProducts);
router.get('/product', productController.products);
router.get('/users/search', productController.Apiqandtype);

module.exports = router;
