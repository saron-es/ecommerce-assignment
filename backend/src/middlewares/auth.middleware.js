// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const { sendError } = require('../utils/response');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Authorization token missing', [], 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user info to request
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) return sendError(res, 'User not found', [], 401);
    req.user = user;
    next();
  } catch (err) {
    return sendError(res, 'Invalid or expired token', [], 401);
  }
};

module.exports = authMiddleware;
