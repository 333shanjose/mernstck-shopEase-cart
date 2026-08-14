import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* About */}
        <div className="footer-column">
          <h2 className="footer-logo">ShopNow</h2>

          <p>
            Your one-stop online store for quality products
            at the best prices.
          </p>

          <div className="social-links">
            <a href="#" aria-label="Facebook">
              f
            </a>

            <a href="#" aria-label="Instagram">
              ◎
            </a>

            <a href="#" aria-label="Twitter">
              𝕏
            </a>

            <a href="#" aria-label="YouTube">
              ▶
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/products">Products</Link>
            </li>

            <li>
              <Link to="">Categories</Link>
            </li>

            <li>
              <Link to="">Offers</Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-column">
          <h3>Customer Service</h3>

          <ul>
            <li>
              <Link to="">Contact Us</Link>
            </li>

            <li>
              <Link to="">Shipping Information</Link>
            </li>

            <li>
              <Link to="">Returns & Refunds</Link>
            </li>

            <li>
              <Link to="">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact Us</h3>

          <p>📍 Kerala, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ support@shopnow.com</p>

          <p className="footer-time">
            Mon - Sat: 9:00 AM - 6:00 PM
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} ShopNow. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;
