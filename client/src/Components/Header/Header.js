import React,{useState} from "react";
import { Link, useHistory,useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import "./Header.css";
import { getProductsBykey } from "../../reduxSlice/ProductSlice";

function Header() {
  const history = useHistory();
  const {id}    =useParams()
  const dispatch=useDispatch()
  const [keyword, setKeyword] = useState("");
  const cartItems = useSelector((state) => state.cart.items);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };
   
  const handleSearch= async (e)=>{
    if (!keyword.trim()) return;
    
    const result = await dispatch(getProductsBykey(keyword));

    const product = result.payload;
      console.log(product)

      if (product.length > 0) {
        history.push(`/product/${product[0]._id}`);
      }

   } 

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">🛍 ShopEase</Link>
      </div>

      <div className="header-search">
        <input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>

        <Link to="/cart" className="cart">
          🛒 Cart
          <span className="cart-count">
            {cartItems?.length || 0}
          </span>
        </Link>

        {token ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
