const express = require('express');
const router = express.Router();
const { getAllProducts, getSingleProduct, createProduct , addToCart, removeFromCart, deleteProduct} = require('../cantroller/productcantrol');
const {authMiddleware} = require('../mid/auth');

// Define routes
router.post('/create', createProduct);
router.get('/feed', getAllProducts);
router.get('/products/:id', getSingleProduct);
router.post('/:id', authMiddleware, addToCart);
router.post('/remove/:id', authMiddleware, removeFromCart);
router.get('/delete/:id', deleteProduct);

module.exports = router;
