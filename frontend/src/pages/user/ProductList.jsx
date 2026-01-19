import { useEffect, useState } from "react";
import { getProducts } from "../../api/api";
import ProductCard from "../../components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      setProducts(res.object || []);
    };
    fetchProducts();
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Our Products</h2>
      {products.length === 0 ? (
        <p style={styles.empty}>No products available</p>
      ) : (
        <div style={styles.grid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    padding: "40px 60px",
    background: "#f5f7fa",
    minHeight: "90vh",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "30px",
    color: "#1e3c72",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  },
  empty: {
    fontSize: "18px",
    textAlign: "center",
    color: "#666",
  },
};

export default ProductList;
