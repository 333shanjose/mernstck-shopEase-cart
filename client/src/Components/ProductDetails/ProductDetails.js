import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../reduxSlice/ProductSlice";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const API = process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();
   console.log(id)
  const { product, loading } = useSelector((state) => state.products);
     console.log(product)
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  return (
    <div className="product-details">
      <div className="product-image">
        <img
          src={`${API}/uploads/${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>

        <p className="price">₹{product.price}</p>

        <p className="category">
          <strong>Category:</strong> {product.category}
        </p>

        <p className="description">{product.description}</p>

        <button className="cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;