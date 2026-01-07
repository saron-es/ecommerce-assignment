// src/app.js
const express = require('express');
const app = express();

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const errorHandler = require('./middlewares/error.middleware');

// Middleware
app.use(express.json()); // Parse JSON requests

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check / default route
app.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'E-commerce API is running',
  });
});

// Global error handler
app.use(errorHandler);

module.exports = app;