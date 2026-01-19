// src/api/api.js
const BASE_URL = "http://localhost:5000/api"; // change port if your backend uses another

// Auth APIs
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Product APIs
export const getProducts = async (search = "", page = 1, pageSize = 10) => {
  const res = await fetch(
    `${BASE_URL}/products?search=${search}&page=${page}&pageSize=${pageSize}`
  );
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};

export const createProduct = async (data, token) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Order APIs
export const placeOrder = async (data, token) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getOrders = async (token) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  return res.json();
};
