import { useState, useEffect } from "react";

const mockProfile = {
  name: "Abebe Kebede",
  email: "Abebe@kebede.com",
};

const mockOrders = [
  { id: 1, status: "Delivered", total: 120.50 },
  { id: 2, status: "Processing", total: 75.00 },
];

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setProfile(mockProfile);
      setOrders(mockOrders);
    }, 1000);
  }, []);

  if (!profile) return <p style={{ padding: 40, fontSize: 18, color: "#666" }}>Loading profile...</p>;

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>User Dashboard</h2>
      <p style={styles.subtitle}>Manage your orders and profile details.</p>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Profile</h3>
          <p style={styles.cardText}><strong>Name:</strong> {profile.name}</p>
          <p style={styles.cardText}><strong>Email:</strong> {profile.email}</p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Orders</h3>
          {orders.length === 0 ? (
            <p style={styles.cardText}>No orders yet.</p>
          ) : (
            orders.map(order => (
              <div key={order.id} style={{ marginBottom: "15px" }}>
                <p style={styles.cardText}><strong>Order ID:</strong> {order.id}</p>
                <p style={styles.cardText}><strong>Status:</strong> {order.status}</p>
                <p style={styles.cardText}><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                <hr style={{ borderColor: "#eee" }} />
              </div>
            ))
          )}
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
  cards: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
  },
  card: {
    flex: "1 1 250px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    minWidth: "250px",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#1e3c72",
  },
  cardText: {
    fontSize: "16px",
    color: "#555",
    lineHeight: "1.5",
  },
};

export default UserDashboard;
