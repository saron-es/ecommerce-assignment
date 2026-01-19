import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { createProduct } from "../../api/api";
import ProductForm from "../../components/ProductForm";

const AdminDashboard = () => {
  const { token } = useContext(AppContext);

  const handleCreate = async (data) => {
    try {
      const res = await createProduct(data, token);

      if (!res.success) {
        alert(res.message || "Failed to create product");
        return;
      }

      alert("✅ Product created successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Server error while creating product");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <p style={styles.subtitle}>Create and manage products in the store</p>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Add New Product</h3>
          <ProductForm onSubmit={handleCreate} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "50px 60px",
    background: "#f5f7fa",
    minHeight: "90vh",
  },
  container: {
    maxWidth: "700px",
    margin: "0 auto",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1e3c72",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#1e3c72",
  },
};

export default AdminDashboard;
