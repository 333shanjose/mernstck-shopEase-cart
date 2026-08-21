import { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateQuantity,fetchCart,removeCart } from "../../reduxSlice/CartSlice";
import "./Cart.css";


const Cart = () => {
   const dispatch=useDispatch()
   const history=useHistory()
   const API = process.env.REACT_APP_API_URL;

  const items = useSelector((state)=>{
         return state.cart.items
  });
  const subtotal = items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
   useEffect(()=>{
      dispatch(fetchCart())
   },[dispatch])
     
  

  return (
    <div style={{padding: "20px"}}>
      <h1>Cart</h1>
      {items.length===0?(
         <h2>your cart is empty</h2>
      ) : (
        
      <div style={{display:"flex", justifycontent:'center',height:"200px",marginTop:"100px"}}>  
      <table>
      <tr>
           <th style={{paddingLeft:"40px",paddingTop:"30px"}}>PRODUCT</th>
           <th style={{paddingLeft:"40px",paddingTop:"30px"}}>PRICE</th>
           <th style={{paddingLeft:"40px",paddingTop:"30px"}}>QUANTITY</th>
           <th style={{paddingLeft:"40px",paddingTop:"30px"}}>TOTAL</th>


        </tr>
      {items.map((item) => (
        <tr key={item.productId._id} style={{paddingTop:"300px", borderBottom: "1px solid #ddd" }}>
          
          <td> 
            <img
                src={`${API}/uploads/${item.productId.image}`}
                alt={item.productId.name}
                width="120px"
              />
          
          
          <h3>{item.productId.name}</h3>
          </td>
          <td> 
          <p>₹{item.productId.price}</p>
          </td>
          <td>
          <span style={{ cursor: "pointer", padding: "5px" }}
                  onClick={() => {
                     console.log('clicked')
                    dispatch(
                      updateQuantity({
                        productId:
                          item.productId._id,
                        action: "decrease",
                      })
                    )
                  }}
                >
                  -
                </span>

                <span
                  style={{
                    margin: "0 15px",
                  }}
                >
          

          {item.quantity}
          </span>

          <span style={{ cursor: "pointer", padding: "5px" }}
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId:
                          item.productId._id,
                        action: "increase",
                      })
                    )
                  }
                >
                  +
                </span>
                </td>
                
                <td>
                    ₹{item.productId.price * item.quantity}
                  </td>
                
                <td>
                <button
            onClick={() =>{
              dispatch(
                removeCart(
                  item.productId._id
                )
              )
            }}
          >
            Remove
          </button>
          </td>
          </tr>

      ))}     
         
      
      
      </table>  
      
      
      
      <div class="box">
        <p style={{fontSize:"20px",fontFamily:"cursive"}}>ESTIMATE SHIPPING</p>
        <div style={{paddingTop:"30px",display:"flex"}}>
          <p>Subtotal</p>
          <p style={{marginLeft:"60px"}}>${subtotal}</p>
        </div>
        <div>
          <button style={{padding:"5px",paddingTop:"15px",borderRadius:"5px",color:"white",backgroundColor:"red",marginTop:"30px",marginLeft:"30px"}}
               onClick={() => history.push("/checkout")}>
             <p>CHECKOUT</p>
          </button>
         </div>
      </div>
      </div>
      )}
      
      

    </div>
  )};
          

export default Cart;