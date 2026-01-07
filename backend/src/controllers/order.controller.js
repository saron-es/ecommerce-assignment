// src/controllers/order.controller.js
const prisma = require('../config/db');
const { sendCreated, sendSuccess, sendError } = require('../utils/response');

// User Story 9: Place New Order
const placeOrder = async (req, res) => {
  const { products } = req.body; // [{ productId, quantity }]
  const userId = req.user.id;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return sendError(res, 'Products array is required', [], 400);
  }

  try {
    const result = await prisma.$transaction(async (prismaTx) => {
      let totalPrice = 0;
      const orderItemsData = [];

      for (const item of products) {
        const product = await prismaTx.product.findUnique({ where: { id: item.productId } });
        if (!product) throw { status: 404, message: `Product not found: ${item.productId}` };
        if (product.stock < item.quantity) throw { status: 400, message: `Insufficient stock for ${product.name}` };

        // Reduce stock
        await prismaTx.product.update({
          where: { id: item.productId },
          data: { stock: product.stock - item.quantity }
        });

        totalPrice += product.price * item.quantity;
        orderItemsData.push({ productId: product.id, quantity: item.quantity });
      }

      // Create order
      const order = await prismaTx.order.create({
        data: {
          userId,
          totalPrice,
          status: 'pending',
          items: {
            create: orderItemsData
          }
        },
        include: {
          items: true
        }
      });

      return order;
    });

    sendCreated(res, 'Order placed successfully', result);
  } catch (err) {
    console.error(err);
    if (err.status && err.message) {
      return sendError(res, err.message, [], err.status);
    }
    sendError(res, 'Failed to place order', [err.message], 500);
  }
};

// User Story 10: View My Order History
const getOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { product: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    sendSuccess(res, 'Orders retrieved successfully', orders);
  } catch (err) {
    console.error(err);
    sendError(res, 'Failed to retrieve orders', [err.message], 500);
  }
};

module.exports = { placeOrder, getOrders };
