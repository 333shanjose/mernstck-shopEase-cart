import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchProducts } from "../../reduxSlice/ProductSlice";
import "./NewArrivals.css";

function NewArrivals() {
  const dispatch = useDispatch();
  const history = useHistory();
  const API = process.env.REACT_APP_API_URL;


  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get latest 4 products
  const newProducts = [...products]
    .reverse()
    .slice(0, 4);

  const handleProductClick = (id) => {
    history.push(`/product/${id}`);
  };

  return (
    <section className="new-arrivals">

      <div className="new-arrivals-container">

        {/* Heading */}
        <div className="new-arrivals-heading">
          <h2>New Arrivals</h2>
          <p>Check out our latest products</p>
        </div>

        {/* Loading */}
        {loading && <p className="message">Loading products...</p>}

        {/* Error */}
        {error && <p className="message">{error}</p>}

        {/* Products */}
        <div className="new-arrivals-grid">

          {!loading &&
            newProducts.map((product) => (
              <div
                className="new-product-card"
                key={product._id}
                onClick={() => handleProductClick(product._id)}
              >

                {/* Image */}
                <div className="new-product-image">
                  <img
                    src={`${API}/uploads/${product.image}`}
                    alt={product.name}
                  />

                  <span className="new-badge">
                    New
                  </span>
                </div>

                {/* Product Details */}
                <div className="new-product-content">

                  <h3>{product.name}</h3>

                  <p className="new-product-description">
                    {product.description}
                  </p>

                  <div className="new-product-bottom">

                    <span className="new-product-price">
                      ₹{product.price}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product._id);
                      }}
                    >
                      View Product
                    </button>

                  </div>

                </div>

              </div>
            ))}

        </div>

        {/* View All */}
        <div className="view-all-container">
          <button
            className="view-all-btn"
            onClick={() => history.push("/products")}
          >
            View All Products
          </button>
        </div>

      </div>

    </section>
  );
}

export default NewArrivals;