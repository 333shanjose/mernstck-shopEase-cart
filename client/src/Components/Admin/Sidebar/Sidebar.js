import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="admin-sidebar">

      <div className="admin-logo">
        <h2>Admin Panel</h2>
      </div>

      <nav>

        <Link to="/admin/dashboard" className="active">
          📊 Dashboard
        </Link>

        <Link to="/admin/users">
          👥 Users
        </Link>

        <Link to="/admin/products">
          📦 Products
        </Link>

        <Link to="/admin/add-products">
          ➕ Add Product
        </Link>

        <Link to="/admin/categories">
          🏷 Categories
        </Link>

        <Link to="/admin/orders">
          🛒 Orders
        </Link>

      </nav>

      <div className="sidebar-bottom">

        <Link to="/">
          🏠 Back to Store
        </Link>

      </div>

    </aside>
  );
}

export default Sidebar;