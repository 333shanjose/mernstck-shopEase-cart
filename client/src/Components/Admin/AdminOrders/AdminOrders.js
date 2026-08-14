import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchAdminOrders,
  deleteAdminOrder,
  updateAdminOrderStatus,
} from "../../../reduxSlice/OrderSlice";

import "./AdminOrders.css";

function AdminOrders() {
  const dispatch = useDispatch();

  const {
    orders = [],
    loading,
    error,
  } = useSelector((state) => state.order);

  // Fetch all orders
  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  // Delete order
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) {
      return;
    }

    dispatch(deleteAdminOrder(id));
  };

  // Update order status
  const handleStatusChange = (id, status) => {
    dispatch(
      updateAdminOrderStatus({
        id,
        status,
      })
    );
  };

  return (
    <div className="admin-orders-page">

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

  <Link to="/admin/add-product">
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


      {/* Header */}

      <div className="orders-header">
        <h2>Orders</h2>

        <p>
          Total Orders: <strong>{orders.length}</strong>
        </p>
      </div>


      {/* Loading */}

      {loading && (
        <p className="message">
          Loading...
        </p>
      )}


      {/* Error */}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}


      {/* No Orders */}

      {!loading && orders.length === 0 && (
        <div className="no-orders">
          <h3>No Orders Found</h3>
        </div>
      )}


      {/* Orders */}

      {orders.length > 0 && (
        <div className="orders-table-container">

          <table className="orders-table">

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>


            <tbody>

              {orders.map((order) => (

                <tr key={order._id}>

                  {/* Order ID */}

                  <td>
                    #{order._id.slice(-6)}
                  </td>


                  {/* Customer */}

                  <td>
                    {order.userId?.name || "Unknown"}

                    <br />

                    <small>
                      {order.userId?.email || ""}
                    </small>
                  </td>


                  {/* Products */}

                  <td>
                    {order.items?.map(
                      (item, index) => (

                        <div
                          className="order-product"
                          key={index}
                        >

                          <span>
                            {item.productId?.name ||
                              "Product"}
                          </span>

                          <span>
                            × {item.quantity}
                          </span>

                        </div>

                      )
                    )}
                  </td>


                  {/* Total */}

                  <td>
                    ₹{order.totalPrice || 0}
                  </td>


                  {/* Payment */}

                  <td>
                    {order.paymentMethod || "N/A"}
                  </td>


                  {/* Status */}

                  <td>

                    <select
                      value={
                        order.status || "Pending"
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </td>


                  {/* Date */}

                  <td>
                    {order.createdAt
                      ? new Date(
                          order.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>


                  {/* Delete */}

                  <td>

                    <button
                      className="delete-order-btn"
                      onClick={() =>
                        handleDelete(order._id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default AdminOrders;