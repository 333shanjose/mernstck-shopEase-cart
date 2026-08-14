import React, { useEffect } from "react";
import "./FeaturedProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../reduxSlice/ProductSlice";
import { addCart } from "../../reduxSlice/CartSlice";

import { Link } from "react-router-dom";

function Products() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (error) {
    return <h2 className="loading">{error}</h2>;
  }

  return (
    <section className="featured-products">
      <div className="container">

        <div className="heading">
          <h2>Featured Products</h2>
          <p>Explore our latest and best-selling products.</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>

              <div className="product-image">

                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                />

                <span className="badge">Featured</span>

              </div>

              <div className="product-content">

                <h3>{product.name}</h3>

                <p className="category">
                  {product.category}
                </p>

                <p className="description">
                  {product.description}...
                </p>

                <div className="price-row">

                  <h4>₹{product.price}</h4>

                  <span className="stock">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>

                </div>

                <div className="buttons">

                  <button className="cart-btn" onClick={()=>{
                       console.log("Button clicked", product._id);
                       dispatch(addCart(product._id))
                  }}>
                    Add To Cart
                  </button>
                  <Link
                    className="details-btn"
                    to={`/product/${product._id}`}
                  >
                    View Details
                  </Link>

                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Products;