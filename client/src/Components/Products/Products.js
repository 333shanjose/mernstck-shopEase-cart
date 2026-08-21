import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchProducts } from "../../reduxSlice/ProductSlice";
import "./Products.css";

function Products() {
  const dispatch = useDispatch();
  const history = useHistory();
  const API = process.env.REACT_APP_API_URL;

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductClick = (id) => {
    history.push(`/product/${id}`);
  };

  if (loading) {
    return (
      <div className="products-message">
        <h3>Loading products...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-message">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <section className="products-page">

      <div className="products-container">

        {/* Heading */}
        <div className="products-heading">
          <h1>Our Products</h1>
          <p>Explore our latest collection</p>
        </div>

        {/* Products */}
        <div className="products-grid">

          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                className="product-card"
                key={product._id}
                onClick={() => handleProductClick(product._id)}
              >

                {/* Image */}
                <div className="product-image">
                  <img
                    src={`${API}/uploads/${product.image}`}
                    alt={product.name}
                  />
                </div>

                {/* Details */}
                <div className="product-details">

                  <h3>{product.name}</h3>

                  <p className="product-description">
                    {product.description}
                  </p>

                  <div className="product-footer">

                    <span className="product-price">
                      ₹{product.price}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product._id);
                      }}
                    >
                      View Details
                    </button>

                  </div>

                </div>

              </div>
            ))
          ) : (
            <div className="products-message">
              <h3>No products found</h3>
            </div>
          )}

        </div>

      </div>

    </section>
  );
}

export default Products;