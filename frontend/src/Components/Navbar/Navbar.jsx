import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <img
          src={require("../Assets/logo.png")}
          alt=""
          style={{ backgroundColor: "#fff" }}
        />
        <p>FOOD DELIVERY</p>
      </div>

      {/* Menu */}
      <ul className="nav-menu">
        <li>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Home
          </Link>
        </li>

        <li style={{ cursor: "pointer" }}>
          <Link
            to="/cart"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Go To Cart
          </Link>
        </li>
      </ul>

      {/* Right Section */}
      <div className="nav-cart-login">
        {/* Profile OR Login */}
        {user ? (
          <div style={styles.userSection}>
            <Link
              to="/profile"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={styles.profile}>👤 {user.name}</div>
            </Link>

            <button
              style={styles.logoutBtn}
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}

        {/* Cart */}
        <div className="nav-cart">
          <img src={require("../Assets/cart_icon.png")} alt="" width="30" />

          <div className="nav-cart-count">
            {JSON.parse(localStorage.getItem("cart"))?.length || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  profile: {
    background: "#fff",
    padding: "8px 15px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },

  logoutBtn: {
    width: "100px",
    height: "40px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    background: "#4b3621",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Navbar;
