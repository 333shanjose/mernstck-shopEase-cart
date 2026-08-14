import React from "react";
import "./WhyChooseUs.css";

function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: "🚚",
      title: "Free Shipping",
      description:
        "Enjoy free shipping on orders above ₹500.",
    },
    {
      id: 2,
      icon: "🔒",
      title: "Secure Payment",
      description:
        "Your payment information is safe and secure.",
    },
    {
      id: 3,
      icon: "↩️",
      title: "Easy Returns",
      description:
        "Easy and hassle-free returns within 7 days.",
    },
    {
      id: 4,
      icon: "📞",
      title: "24/7 Support",
      description:
        "Our customer support team is always here to help.",
    },
  ];

  return (
    <section className="why-choose-us">
      <div className="why-container">

        {/* Heading */}
        <div className="why-heading">
          <h2>Why Choose Us?</h2>
          <p>
            We provide the best shopping experience for our customers.
          </p>
        </div>

        {/* Features */}
        <div className="why-grid">

          {features.map((feature) => (
            <div className="why-card" key={feature.id}>

              <div className="why-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;