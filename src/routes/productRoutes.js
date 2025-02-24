const express = require('express');
const { addProduct, getProductsByStore, searchProducts, getProductDetails } = require('../controller/productController');

const router = express.Router();

router.post('/add', addProduct);
router.get('/store/:storeId', getProductsByStore);
router.get('/search', searchProducts);
router.get('/:sku/:storeId', getProductDetails);

module.exports = router;