// src/components/ProductForm.jsx
import { useState } from "react";

const ProductForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState(initialData || {
    name: "",
    description: "",
    price: "",
    stock: "",
    category: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
      <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
