import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company */}
        <div className="footer-about">
          <Link to="/" className="footer-logo">
            <img
              src="https://cdn.dribbble.com/userupload/48551110/file/f730ea2ceb0ebb81692e526e355c1c90.png"
              alt="Believers Consultancy"
            />
          </Link>

          <p>
            Your ultimate guide to counselling. 100% free access to all
            resources and expert guidance.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.instagram.com/believers.medcounselling"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.youtube.com/@BelieversConsultancy"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/announcements">Announcements</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>

        {/* Counselling */}
        <div className="footer-links">
          <h3>Counsellings</h3>

          <Link to="/dashboard/neet-pg">NEET PG</Link>
          <Link to="/dashboard/neet-ug">NEET UG</Link>
          <Link to="/dashboard/inicet">INICET</Link>
          {/* <Link to="/dashboard/neet-ss">NEET SS</Link> */}
        </div>

        {/* Contact */}
        <div className="footer-links">
          <h3>Contact</h3>

          <a href="tel:+919211724969">
            <FaPhoneAlt />
            +91 9211724969
          </a>

          <a href="mailto:contact@believersconsultancy.com">
            <FaEnvelope />
            contact@believersconsultancy.com
          </a>

          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>

      <div className="footer-copyright">
        <p>
          © {new Date().getFullYear()} Believers Destination Pvt Ltd. All rights
          reserved. | Empowering students with free counselling guidance.
        </p>

        <p className="footer-credit">
          Designed &amp; Managed By:&nbsp;
          <a
            href="https://believersdestination.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Believers Destination Pvt Ltd
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
