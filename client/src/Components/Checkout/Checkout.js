import React, {useState} from 'react'
import { useHistory } from "react-router-dom";

import "./Checkout.css";
import {  useSelector,useDispatch } from "react-redux";
import { placeOrder } from '../../reduxSlice/OrderSlice'
import { createOrder,verifyPayment } from '../../reduxSlice/PaymentSlice'

function Checkout() {
    const { items } = useSelector((state) => state.cart);
        const dispatch=useDispatch()
        const history=useHistory()
        console.log(items)

        const [shipping, setShipping] = useState({
          fullName: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
        });
         
        const [paymentMethod, setPaymentMethod] = useState("");

        const handleChange = (e) => {
          setShipping({
            ...shipping,
            [e.target.name]: e.target.value,
          });
        };

      const subtotal = items.reduce(
        (total, item) => total + item.productId.price * item.quantity,
        0
      );
      const total=subtotal+100

      const handlePlaceOrder = async () => {
        const orderData = {
          shippingAddress: shipping,
          paymentMethod:paymentMethod,
          items,
          subtotal,
        };
    
        if (paymentMethod === "Online") {

          const result = await dispatch(createOrder(total));
            console.log(result.payload)
          if (!result.payload) {
            alert("Unable to create Razorpay order");
            return;
          }
        
          openRazorpay(result.payload);
        
          return;
        }
        if (paymentMethod === "COD") {

          await dispatch(placeOrder(orderData));
  
          history.push("/orders");
      }
      }

      const openRazorpay = (razorpayOrder) => {
         console.log('reached')
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            
          amount: razorpayOrder.amount,
      
          currency: razorpayOrder.currency,
      
          name: "My E-Commerce Store",
      
          description: "Order Payment",
      
          order_id: razorpayOrder.id,
      
          handler: async function (response) {
            console.log(response);
             
            const verify = await dispatch(
              verifyPayment({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                
              })
            );
            if (verify.payload?.success) {
              const orderData = {
                shippingAddress: shipping,
                paymentMethod: "ONLINE",
                items,
                subtotal,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
            };
    
            await dispatch(placeOrder(orderData));
    
            history.push("/orders");
              
            }else{
              alert("payment verification failed")
            }
            // Verify payment here
          },
      
          prefill: {
            name: shipping.fullName,
            contact: shipping.phone,
          },
      
          theme: {
            color: "#3399cc",
          },
        };
      
        const razorpay = new window.Razorpay(options);
      
        razorpay.open();
      };
  return (
    <div>
       <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-content">
        {/* Shipping Form */}
        <div className="shipping-section">
          <h2>Shipping Address</h2>

          <input type="text" 
           placeholder="Full Name"
           name="fullName"
           value={shipping.fullName}
           onChange={handleChange} />

          <input type="text" 
          name="phone"
          value={shipping.phone}
          onChange={handleChange}
          placeholder="Phone Number" />


          <input type="text"
           name="address"
           value={shipping.address}
           onChange={handleChange}
           placeholder="Address" />

          <input type="text" 
          name="city"
          value={shipping.city}
          onChange={handleChange}
          placeholder="City" />

          <div className="row">
            <input type="text" 
            name="state"
            value={shipping.state}
            onChange={handleChange}
            placeholder="State" />

            <input type="text" 
            name="pincode"
            value={shipping.pincode}
            onChange={handleChange}
            placeholder="Pincode" />
          </div>
          
          <h3>Payment Method</h3>

         <div className="payment">

           <label>
             <input
              type="radio"
              checked={paymentMethod==="COD"}
              onChange={() => setPaymentMethod("COD")}
               />
           Cash On Delivery
         </label>

         <label>
            <input
              type="radio"
              checked={paymentMethod==="Online"}
              onChange={() => setPaymentMethod("Online")}


            />
            Online Payment
          </label>
        </div>

          <button className="place-order-btn" onClick={()=>{
              handlePlaceOrder()
          }}>
            Place Order
          </button>
        </div>

        {/* Order Summary */}
        <div className="summary-section">
          <h2>Order Summary</h2>

          {items.map((item) => (
           <div>
          <div className="summary-item">
            <span>{item.productId.name} × {item.quantity} </span>
            <span>₹{item.productId.price}</span>
          </div>

          

          <hr />
          </div>
          ))}

          <div className="summary-item">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-item">
            <span>Delivery</span>
            <span>₹100</span>
          </div>

          <div className="summary-item total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          </div>
      </div>
    </div>
    </div>
  );
}

export default Checkout;




    