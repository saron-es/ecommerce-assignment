import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProductById(id);
      setProduct(res.object);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p style={styles.loading}>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>{product.name}</h2>
        <p style={styles.description}>{product.description}</p>
        <div style={styles.info}>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Category:</strong> {product.category}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "50px 60px",
    display: "flex",
    justifyContent: "center",
    background: "#f5f7fa",
    minHeight: "90vh",
  },
  card: {
    width: "600px",
    padding: "40px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1e3c72",
    marginBottom: "20px",
  },
  description: {
    fontSize: "18px",
    marginBottom: "25px",
    lineHeight: "1.6",
    color: "#555",
  },
  info: {
    fontSize: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    color: "#333",
  },
  loading: {
    fontSize: "20px",
    textAlign: "center",
    marginTop: "100px",
    color: "#666",
  },
};

export default ProductDetail;
