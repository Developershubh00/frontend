import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-logo">
          <img
            src="https://cdn.dribbble.com/userupload/48551110/file/f730ea2ceb0ebb81692e526e355c1c90.png"
            alt=""
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="nav-menu">
          <Link to="/">Home</Link>

          <div className="nav-dropdown">
            <div className="nav-dropdown-toggle">
              Counsellings
              <ChevronDown size={18} />
            </div>

            <div className="nav-dropdown-menu">
              <Link to="/neet-pg">NEET PG</Link>
              <Link to="/neet-ug">NEET UG</Link>
              <Link to="/inicet">INICET</Link>
              {/* <Link to="/neet-ss">NEET SS</Link> */}
            </div>
          </div>

          <Link to="/blogs">Blogs</Link>
          <Link to="/announcements">Announcements</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact-us">Contact Us</Link>
        </nav>

        {/* Desktop Auth */}
        <div className="desktop-auth">
          {isAuthenticated ? (
            <button className="nav-logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <Link to="/login" className="nav-login-btn">
              Log-In | Sign-Up
            </Link>
          )}
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <div className="mobile-dropdown">
          <button
            className="mobile-dropdown-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Counsellings
            <ChevronDown size={18} className={dropdownOpen ? "rotate" : ""} />
          </button>

          {dropdownOpen && (
            <div className="mobile-dropdown-content">
              <Link to="/neet-pg" onClick={closeMenu}>
                NEET PG
              </Link>
              <Link to="/neet-ug" onClick={closeMenu}>
                NEET UG
              </Link>
              <Link to="/inicet" onClick={closeMenu}>
                INICET
              </Link>
              {/* <Link to="/neet-ss" onClick={closeMenu}>
                NEET SS
              </Link> */}
            </div>
          )}
        </div>

        <Link to="/blogs" onClick={closeMenu}>
          Blogs
        </Link>
        <Link to="/announcements" onClick={closeMenu}>
          Announcements
        </Link>
        <Link to="/careers" onClick={closeMenu}>
          Careers
        </Link>
        <Link to="/contact-us" onClick={closeMenu}>
          Contact Us
        </Link>

        {isAuthenticated ? (
          <button className="nav-logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <Link to="/login" className="nav-login-btn" onClick={closeMenu}>
            Log-In | Sign-Up
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
