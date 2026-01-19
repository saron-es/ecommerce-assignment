import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    setToken("");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <h2>E-Commerce</h2>
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Products</Link>
        <Link to="/user" style={styles.link}>User</Link>
        <Link to="/admin" style={styles.link}>Admin</Link>

        {!user ? (
          <Link to="/login" style={{ ...styles.link, ...styles.login }}>
            Login
          </Link>
        ) : (
          <button onClick={logout} style={styles.btn}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 50px",
    background: "linear-gradient(90deg, #1e3c72, #2a5298)",
    color: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    fontSize: "18px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontWeight: "bold",
    fontSize: "24px",
    letterSpacing: "1px",
  },
  links: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    marginRight: "25px",
    textDecoration: "none",
    fontWeight: "500",
  },
  login: {
    fontWeight: "bold",
    border: "1px solid #fff",
    padding: "6px 14px",
    borderRadius: "6px",
  },
  btn: {
    backgroundColor: "#ff4c4c",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    padding: "8px 16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Navbar;
