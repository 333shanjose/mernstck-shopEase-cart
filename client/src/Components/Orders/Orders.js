import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../reduxSlice/OrderSlice";
import "./Orders.css";

function Orders() {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <h2>Loading Orders...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div className="orders-page">
      <h1 className="page-title">My Orders</h1>

      {orders.length === 0 ? (
        <h2 className="empty-order">No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            {/* Order Header */}

            <div className="order-header">

              <div className="header-item">
                <span className="header-title">ORDER ID</span>
                <span>{order._id}</span>
              </div>

              <div className="header-item">
                <span className="header-title">ORDER DATE</span>
                <span>
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="header-item">
                <span className="header-title">TOTAL</span>
                <span>₹{order.totalPrice}</span>
              </div>

              <div className="header-item">
                <span className="header-title">PAYMENT</span>
                <span>{order.paymentMethod}</span>
              </div>

              <div className="header-item">
                <span className="header-title">STATUS</span>
                <span className="status">{order.status}</span>
              </div>

            </div>

            {/* Ordered Products */}

            <div className="products">

              {order.orderItems.map((item) => (
                <div className="product-card" key={item._id}>

                  <img
                    src={`http://localhost:5000/uploads/${item.productId.image}`}
                    alt={item.productId.name}
                  />

                  <div className="product-details">

                    <h3>{item.productId.name}</h3>

                    <p>Price : ₹{item.price}</p>

                    <p>Quantity : {item.quantity}</p>

                    <p>
                      Total : ₹{item.price * item.quantity}
                    </p>

                  </div>

                </div>
              ))}

            </div>

            {/* Shipping */}

            <div className="shipping-box">

              <h3>Shipping Address</h3>

              <p>{order.shippingAddress.fullName}</p>

              <p>{order.shippingAddress.phone}</p>

              <p>{order.shippingAddress.address}</p>

              <p>
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.state}
              </p>

              <p>{order.shippingAddress.pincode}</p>

            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default Orders;