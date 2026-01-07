// src/middlewares/role.middleware.js
const { sendError } = require('../utils/response');

const permit = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return sendError(res, 'Forbidden: You do not have permission', [], 403);
    }
    next();
  };
};

module.exports = { permit };

