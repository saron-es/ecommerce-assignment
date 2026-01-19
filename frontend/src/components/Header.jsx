// src/components/Header.jsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ padding: "1rem", background: "#eee" }}>
      <nav>
        <Link to="/">Home</Link> | <Link to="/user/dashboard">User Dashboard</Link> | <Link to="/admin/dashboard">Admin Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;
