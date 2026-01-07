// src/middlewares/error.middleware.js
const { sendError } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  sendError(res, 'Internal server error', [err.message], 500);
};

module.exports = errorHandler;
