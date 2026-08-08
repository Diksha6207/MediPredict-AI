import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #d1fae5",
        boxShadow: "0 6px 18px rgba(0,0,0,.08)",
      }}
    >
      <nav
        style={{
          maxWidth: "1350px",
          margin: "0 auto",
          padding: "14px 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}

        <NavLink
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
          }}
        >
          <img
            src={logo}
            alt="MediPredict AI"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
            }}
          />

          <div>
            <div
              style={{
                fontWeight: "800",
                color: "#0f766e",
                fontSize: "24px",
              }}
            >
              MediPredict AI
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              AI Powered Healthcare
            </div>
          </div>
        </NavLink>

        {/* Links */}

        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
          }}
        >
          <NavLink to="/" style={linkStyle}>
            Home
          </NavLink>

          <NavLink to="/predict" style={linkStyle}>
            Predict
          </NavLink>

          <NavLink to="/doctors" style={linkStyle}>
            Doctors
          </NavLink>

          <NavLink to="/history" style={linkStyle}>
            History
          </NavLink>

          <NavLink to="/about" style={linkStyle}>
            About
          </NavLink>

          <NavLink to="/contact" style={linkStyle}>
            Contact
          </NavLink>

          <NavLink
            to="/login"
            style={{
              padding: "10px 22px",
              borderRadius: "12px",
              textDecoration: "none",
              background: "#0f766e",
              color: "white",
              fontWeight: "700",
            }}
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            style={{
              padding: "10px 22px",
              borderRadius: "12px",
              textDecoration: "none",
              background:
                "linear-gradient(135deg,#10b981,#14b8a6)",
              color: "white",
              fontWeight: "700",
              boxShadow: "0 6px 16px rgba(16,185,129,.3)",
            }}
          >
            Register
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  color: isActive ? "#0f766e" : "#334155",
  fontWeight: isActive ? "700" : "600",
  transition: ".3s",
});

export default Navbar;