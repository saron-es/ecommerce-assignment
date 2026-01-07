// src/utils/response.js

const sendSuccess = (res, message, object = null) => {
  return res.status(200).json({
    success: true,
    message,
    object,
    errors: null
  });
};

const sendCreated = (res, message, object = null) => {
  return res.status(201).json({
    success: true,
    message,
    object,
    errors: null
  });
};

const sendError = (res, message, errors = [], status = 400) => {
  return res.status(status).json({
    success: false,
    message,
    object: null,
    errors
  });
};

const sendPaginated = (res, message, object = [], pageNumber = 1, pageSize = 10, totalSize = 0) => {
  return res.status(200).json({
    success: true,
    message,
    object,
    pageNumber,
    pageSize,
    totalSize,
    errors: null
  });
};

module.exports = { sendSuccess, sendCreated, sendError, sendPaginated };
