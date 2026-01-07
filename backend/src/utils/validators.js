// src/utils/validators.js
const validator = require('validator');

const validateEmail = (email) => {
  if (!email) return 'Email is required.';
  if (!validator.isEmail(email)) return 'Invalid email format.';
  return null;
};

const validateUsername = (username) => {
  if (!username) return 'Username is required.';
  if (!/^[a-zA-Z0-9]+$/.test(username)) return 'Username must be alphanumeric without spaces.';
  if (username.length < 3 || username.length > 30) return 'Username must be between 3 and 30 characters.';
  return null;
};

const validatePassword = (password) => {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters long.';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter.';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number.';
  if (!/[!@#$%^&*]/.test(password)) return 'Password must contain at least one special character (!@#$%^&*).';
  return null;
};

const validateProduct = (data) => {
  const errors = [];
  if (!data.name || data.name.length < 3) errors.push('Product name must be at least 3 characters.');
  if (!data.description || data.description.length < 10) errors.push('Product description must be at least 10 characters.');
  if (data.price == null || data.price <= 0) errors.push('Price must be a positive number.');
  if (data.stock == null || data.stock < 0) errors.push('Stock must be a non-negative integer.');
  if (!data.category || data.category.length < 2) errors.push('Category is required.');
  return errors;
};

module.exports = { validateEmail, validateUsername, validatePassword, validateProduct };
