import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/admin/products`)
      .then((res) => {
        setProducts(res.data.products);
        console.log(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteProduct = async (id) => {
    try {
      await fetch(`${API}/admin/product/${id}`, {
        method: "DELETE",
      });

      alert("Deleted successfully");

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (

     
    <div
      style={{
        padding: "20px",
        marginLeft: "200px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Products
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "90%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>

              <td>₹{p.price}</td>

              <td>
                <img
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                  }}
                  src={`${API}/uploads/${p.image}`}
                  alt={p.name}
                />
              </td>

              <td>
                {/* Edit */}
                <Link to={`/admin/edit-products/${p._id}`}>
                  <button
                    style={{
                      marginRight: "10px",
                      padding: "8px 15px",
                      backgroundColor: "blue",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      
                    }}
                  >
                    Edit
                  </button>
                </Link>

                {/* Delete */}
                <button
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteProduct(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product */}

      <Link to="/admin/add-products">
        <button
          style={{
            marginTop: "30px",
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginLeft:"50px"
          }}
        >
          Add Product
        </button>
      </Link>
    </div>
  );
}

export default AdminProducts;