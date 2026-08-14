import React from "react";
import { useHistory } from "react-router-dom";
import "./Offers.css";

function Offers() {
  const history = useHistory();

  const offers = [
    {
      id: 1,
      title: "Summer Sale",
      discount: "50% OFF",
      description: "Get up to 50% discount on selected products.",
      image: "/images/summer-sale.jpg",
    },
    {
      id: 2,
      title: "Fashion Deals",
      discount: "40% OFF",
      description: "Discover the latest fashion at amazing prices.",
      image: "/images/fashion-sale.jpg",
    },
    {
      id: 3,
      title: "Electronics Sale",
      discount: "30% OFF",
      description: "Grab your favorite electronics at special prices.",
      image: "/images/electronics-sale.jpg",
    },
  ];

  const handleShopNow = () => {
    history.push("/products");
  };

  return (
    <section className="offers-section">
      <div className="offers-container">

        {/* Heading */}
        <div className="offers-heading">
          <h2>Special Offers</h2>
          <p>Don't miss our latest deals and discounts</p>
        </div>

        {/* Offers */}
        <div className="offers-grid">
          {offers.map((offer) => (
            <div className="offer-card" key={offer.id}>

              {/* Image */}
              <div className="offer-image-container">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="offer-image"
                />

                <span className="offer-discount">
                  {offer.discount}
                </span>
              </div>

              {/* Content */}
              <div className="offer-content">
                <h3>{offer.title}</h3>

                <p>{offer.description}</p>

                <button onClick={handleShopNow}>
                  Shop Now
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Offers;