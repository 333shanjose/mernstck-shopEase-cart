import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

import { fetchProducts } from "../../../reduxSlice/ProductSlice";
import { fetchOrders } from "../../../reduxSlice/OrderSlice";
import { fetchAdminUsers } from "../../../reduxSlice/AdminUserSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const API = process.env.REACT_APP_API_URL;

  const { products = [] } = useSelector((state) => state.products);
  const { orders = [] } = useSelector((state) => state.order);
  const { users = [] } = useSelector((state) => state.adminUsers);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
    dispatch(fetchAdminUsers());

  }, [dispatch]);

  // Calculate revenue
  const totalRevenue = orders.reduce((total, order) => {
    return total + (order.totalPrice || order.total || 0);
  }, 0);

  // Recent orders
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    )
    .slice(0, 5);

  // Low stock products
  const lowStockProducts = products.filter(
    (product) => product.stock !== undefined && product.stock <= 5
  );

  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
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

      {/* Main Content */}
      <main className="admin-main">

        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, Admin</p>
          </div>

          <div className="admin-profile">
            <div className="profile-icon">
              A
            </div>

            <div>
              <strong>Administrator</strong>
              <span>Admin</span>
            </div>
          </div>
        </header>


        {/* Statistics Cards */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon blue">
              👥
            </div>

            <div>
              <p>Total Users</p>
              <h2>{users.length}</h2>
            </div>
          </div>


          <div className="stat-card">
            <div className="stat-icon green">
              📦
            </div>

            <div>
              <p>Total Products</p>
              <h2>{products.length}</h2>
            </div>
          </div>


          <div className="stat-card">
            <div className="stat-icon orange">
              🛒
            </div>

            <div>
              <p>Total Orders</p>
              <h2>{orders.length}</h2>
            </div>
          </div>


          <div className="stat-card">
            <div className="stat-icon purple">
              ₹
            </div>

            <div>
              <p>Total Revenue</p>
              <h2>₹{totalRevenue.toLocaleString()}</h2>
            </div>
          </div>

        </section>


        {/* Quick Actions */}
        <section className="quick-actions">

          <h2>Quick Actions</h2>

          <div className="action-grid">

            <Link to="/admin/add-products" className="action-card">
              <span>➕</span>
              <div>
                <h3>Add Product</h3>
                <p>Create a new product</p>
              </div>
            </Link>

            <Link to="/admin/products" className="action-card">
              <span>📦</span>
              <div>
                <h3>Manage Products</h3>
                <p>View and edit products</p>
              </div>
            </Link>

            <Link to="/admin/orders" className="action-card">
              <span>🛒</span>
              <div>
                <h3>Manage Orders</h3>
                <p>View customer orders</p>
              </div>
            </Link>

            <Link to="/admin/users" className="action-card">
              <span>👥</span>
              <div>
                <h3>Manage Users</h3>
                <p>View registered users</p>
              </div>
            </Link>

          </div>

        </section>


        {/* Dashboard Content */}
        <div className="dashboard-content">

          {/* Recent Orders */}
          <section className="dashboard-card">

            <div className="card-header">
              <h2>Recent Orders</h2>

              <Link to="/admin/orders">
                View All
              </Link>
            </div>

            {recentOrders.length === 0 ? (

              <div className="empty-state">
                <p>No orders available</p>
              </div>

            ) : (

              <div className="table-wrapper">

                <table>

                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>

                    {recentOrders.map((order) => (

                      <tr key={order._id}>

                        <td>
                          #{order._id?.slice(-6)}
                        </td>

                        <td>
                          {order.userId?.name ||
                            order.user?.name ||
                            "Customer"}
                        </td>

                        <td>
                          ₹
                          {(
                            order.totalPrice ||
                            order.total ||
                            0
                          ).toLocaleString()}
                        </td>

                        <td>

                          <span
                            className={`status ${
                              order.status
                                ? order.status
                                    .toLowerCase()
                                    .replace(" ", "-")
                                : "pending"
                            }`}
                          >
                            {order.status || "Pending"}
                          </span>

                        </td>

                        <td>
                          {order.createdAt
                            ? new Date(
                                order.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </section>


          {/* Low Stock */}
          <section className="dashboard-card">

            <div className="card-header">

              <h2>Low Stock</h2>

              <Link to="/admin/products">
                View All
              </Link>

            </div>


            {lowStockProducts.length === 0 ? (

              <div className="empty-state">
                <p>All products are sufficiently stocked.</p>
              </div>

            ) : (

              <div className="stock-list">

                {lowStockProducts
                  .slice(0, 5)
                  .map((product) => (

                    <div
                      className="stock-item"
                      key={product._id}
                    >

                      <div className="stock-product">

                        <img
                          src={
                            product.image
                              ? `${API}/uploads/${product.image}`
                              : "/images/no-image.png"
                          }
                          alt={product.name}
                        />

                        <div>
                          <h4>{product.name}</h4>
                          <p>₹{product.price}</p>
                        </div>

                      </div>

                      <span className="stock-count">
                        {product.stock} left
                      </span>

                    </div>

                  ))}

              </div>

            )}

          </section>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;