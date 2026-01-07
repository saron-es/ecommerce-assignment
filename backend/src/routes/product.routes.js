// src/routes/product.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { permit } = require('../middlewares/role.middleware');
const { createProduct, updateProduct, getProducts, getProductDetails, deleteProduct } = require('../controllers/product.controller');

// Public routes
router.get('/', getProducts); // list & search products
router.get('/:id', getProductDetails); // product details

// Protected Admin routes
router.post('/', authMiddleware, permit('Admin'), createProduct);
router.put('/:id', authMiddleware, permit('Admin'), updateProduct);
router.delete('/:id', authMiddleware, permit('Admin'), deleteProduct);

module.exports = router;
