// src/routes/order.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { placeOrder, getOrders } = require('../controllers/order.controller');

// All order routes are protected
router.post('/', authMiddleware, placeOrder); // Place a new order
router.get('/', authMiddleware, getOrders);  // View user's orders

module.exports = router;
