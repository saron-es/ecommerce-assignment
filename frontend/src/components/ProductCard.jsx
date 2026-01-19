const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.name}>{product.name}</h3>
      <p style={styles.description}>{product.description}</p>
      <div style={styles.info}>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p><strong>Category:</strong> {product.category}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  name: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e3c72",
    marginBottom: "15px",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#555",
    marginBottom: "20px",
  },
  info: {
    fontSize: "16px",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
};

export default ProductCard;
