import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const API = process.env.REACT_APP_API_URL;

  const fetchCategories = async () => {
    const res = await fetch(`${API}/admin/categories`);
    const data = await res.json();
    setCategories(data);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await fetch(`${API}/admin/category/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={{padding: "20px",position:"absolute",left:"300px",bottom:"400px",top:'50px'}}>
      <h2>Categories</h2>

      <Link to="/admin/add-categories">Add Category</Link>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr key={c._id}>
            <td><img style={{width:"60px"}}  src={`${API}/uploads/${c.image}`}  alt={c.name} /></td>
              <td>{c.name}</td>
              <td>
                <Link to={`/admin/edit-categories/${c._id}`}><button style={{backgroundColor:"green"}}>Edit</button></Link>
                <button style={{backgroundColor:"red",marginLeft:"100px"}} onClick={() => deleteCategory(c._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
       