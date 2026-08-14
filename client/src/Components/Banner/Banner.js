import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

function Banner() {
  return (
    <section className="banner">
      <div className="banner-content">
        <span className="offer">🔥 New Collection 2026</span>

        <h1>
          Discover the Latest <br />
          Fashion Trends
        </h1>

        <p>
          Shop premium quality clothing, footwear, and accessories at
          unbeatable prices.
        </p>

        <div className="banner-buttons">
          <Link to="/products">
            <button className="shop-btn">Shop Now</button>
          </Link>

          <Link to="">
            <button className="learn-btn">Learn More</button>
          </Link>
        </div>
      </div>

      <div className="banner-image">
        <img
          src="/Images/banner1.jpg"
          alt="Shopping Banner"
        />
      </div>
    </section>
  );
}

export default Banner;
