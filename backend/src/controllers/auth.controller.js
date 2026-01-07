// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const { sendCreated, sendError, sendSuccess } = require('../utils/response');
const { validateEmail, validateUsername, validatePassword } = require('../utils/validators');

// User Story 1: Signup
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    const emailError = validateEmail(email);
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const errors = [emailError, usernameError, passwordError].filter(Boolean);
    if (errors.length) return sendError(res, 'Validation failed', errors, 400);

    // Check uniqueness
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) return sendError(res, 'Email already registered', [], 400);
    const existingUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUsername) return sendError(res, 'Username already taken', [], 400);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword }
    });

    sendCreated(res, 'User registered successfully', { id: user.id, username: user.username, email: user.email });
  } catch (err) {
    console.error(err);
    sendError(res, 'Registration failed', [err.message], 500);
  }
};

// User Story 2: Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return sendError(res, 'Email and password are required', [], 400);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return sendError(res, 'Invalid credentials', [], 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendError(res, 'Invalid credentials', [], 401);

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    sendSuccess(res, 'Login successful', { token });
  } catch (err) {
    console.error(err);
    sendError(res, 'Login failed', [err.message], 500);
  }
};

module.exports = { register, login };
