import { useState, useContext } from "react";
import { loginUser } from "../api/api"; // keep if you want real API
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (email && password) {
        const role = email.toLowerCase().includes("admin") ? "Admin" : "User";
        setUser({ username: email.split("@")[0], role });
        setToken("demo-token");
        navigate(role === "Admin" ? "/admin" : "/user");
      } else {
        setMessage("Please enter email and password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Server error");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Welcome Back!</h2>
        {message && <p style={styles.error}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.note}>
        
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
  },
  container: {
    width: "450px",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    padding: "15px",
    fontSize: "18px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "all 0.2s",
  },
  button: {
    padding: "15px",
    fontSize: "18px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #1e3c72, #2a5298)",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  buttonHover: {
    background: "linear-gradient(90deg, #2a5298, #1e3c72)",
  },
  error: {
    color: "#ff4c4c",
    fontWeight: "600",
    marginBottom: "10px",
  },
  note: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#666",
  },
};

export default Login;
