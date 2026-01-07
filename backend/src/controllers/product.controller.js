// src/controllers/product.controller.js
const prisma = require('../config/db');
const { sendCreated, sendSuccess, sendError, sendPaginated } = require('../utils/response');
const { validateProduct } = require('../utils/validators');

// User Story 3: Create Product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Validation
    const errors = validateProduct({ name, description, price, stock, category });
    if (errors.length) return sendError(res, 'Validation failed', errors, 400);

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        category,
        userId: req.user.id
      }
    });

    sendCreated(res, 'Product created successfully', product);
  } catch (err) {
    console.error(err);
    sendError(res, 'Failed to create product', [err.message], 500);
  }
};

// User Story 4: Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return sendError(res, 'Product not found', [], 404);

    // Validation
    const errors = validateProduct({ name: name || product.name, description: description || product.description, price: price ?? product.price, stock: stock ?? product.stock, category: category || product.category });
    if (errors.length) return sendError(res, 'Validation failed', errors, 400);

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, price, stock, category }
    });

    sendSuccess(res, 'Product updated successfully', updatedProduct);
  } catch (err) {
    console.error(err);
    sendError(res, 'Failed to update product', [err.message], 500);
  }
};

// User Stories 5 & 6: Get list/search products with pagination
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const search = req.query.search || '';

    const skip = (page - 1) * pageSize;

    // Count total products matching search
    const totalSize = await prisma.product.count({
      where: { name: { contains: search, mode: 'insensitive' } }
    });

    // Fetch products with pagination
    const products = await prisma.product.findMany({
      where: { name: { contains: search, mode: 'insensitive' } },
      skip,
      take: pageSize,
      orderBy: { name: 'asc' }
    });

    sendPaginated(res, 'Products retrieved successfully', products, page, pageSize, totalSize);
  } catch (err) {
    console.error(err);
    sendError(res, 'Failed to get products', [err.message], 500);
  }
};

// User Story 7: Get product details
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return sendError(res, 'Product not found', [], 404);

    sendSuccess(res, 'Product details retrieved', product);
  } catch (err) {
    console.error(err);
    sendError(res, 'Failed to get product details', [err.message], 500);
  }
};

// User Story 8: Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return sendError(res, 'Product not found', [], 404);

    await prisma.product.delete({ where: { id } });
    sendSuccess(res, 'Product deleted successfully', null);
  } catch (err) {
    console.error(err);
    sendError(res, 'Failed to delete product', [err.message], 500);
  }
};

module.exports = { createProduct, updateProduct, getProducts, getProductDetails, deleteProduct };
