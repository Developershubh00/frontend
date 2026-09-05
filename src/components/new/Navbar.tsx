import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [counsellingOpen, setCounsellingOpen] = useState(false);

  return (
    <header className="bc-navbar">
      <div className="bc-navbar-container">
        {/* =========================
            LOGO
        ========================= */}

        <a href="/" className="bc-navbar-logo">
          <img src="/media/logo4.png" alt="Believers Destination" />
        </a>

        {/* =========================
            DESKTOP NAVIGATION
        ========================= */}

        <nav className="bc-navbar-nav">
          {/* INICET */}

          <a href="#inicet" className="bc-nav-inicet">
            INICET
            <span className="bc-nav-dot">
              <span></span>
            </span>
          </a>

          {/* COUNSELLINGS */}

          <div className="bc-nav-dropdown">
            <button
              type="button"
              className="bc-nav-link bc-counselling-btn"
              onClick={() => setCounsellingOpen(!counsellingOpen)}
            >
              Counsellings
              <ChevronDown
                size={16}
                className={counsellingOpen ? "bc-chevron-active" : ""}
              />
            </button>

            {counsellingOpen && (
              <div className="bc-dropdown-menu">
                <a href="#neet-pg">
                  <strong>NEET PG</strong>
                  <span>Postgraduate Counselling</span>
                </a>

                <a href="#neet-ug">
                  <strong>NEET UG</strong>
                  <span>Undergraduate Counselling</span>
                </a>

                <a href="#inicet-counselling">
                  <strong>INICET</strong>
                  <span>Institute Counselling</span>
                </a>
              </div>
            )}
          </div>

          {/* BLOG */}

          <a href="#blog" className="bc-nav-link">
            Blog
          </a>

          {/* NEWS */}

          <a href="#news" className="bc-nav-link">
            News
          </a>

          {/* CAREERS */}

          <a href="#careers" className="bc-nav-link">
            Careers
          </a>

          {/* CONTACT */}

          <a href="#contact" className="bc-nav-link">
            Contact Us
          </a>
        </nav>

        {/* =========================
            LOGIN BUTTON
        ========================= */}

        <a href="#login" className="bc-login-button">
          Log-In | Sign-Up
        </a>

        {/* =========================
            MOBILE BUTTON
        ========================= */}

        <button
          type="button"
          className="bc-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* =========================
          MOBILE MENU
      ========================= */}

      {mobileOpen && (
        <div className="bc-mobile-menu">
          <a href="#inicet">INICET</a>

          <button
            type="button"
            onClick={() => setCounsellingOpen(!counsellingOpen)}
          >
            <span>Counsellings</span>

            <ChevronDown
              size={17}
              className={counsellingOpen ? "bc-chevron-active" : ""}
            />
          </button>

          {counsellingOpen && (
            <div className="bc-mobile-dropdown">
              <a href="#neet-pg">NEET PG</a>

              <a href="#neet-ug">NEET UG</a>

              <a href="#inicet-counselling">INICET</a>
            </div>
          )}

          <a href="#blog">Blog</a>

          <a href="#news">News</a>

          <a href="#careers">Careers</a>

          <a href="#contact">Contact Us</a>

          <a href="#login" className="bc-mobile-login">
            Log-In | Sign-Up
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
