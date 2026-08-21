import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();
  const history = useHistory();
  const API = process.env.REACT_APP_API_URL;

  const [name, setName] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch(`${API}/admin/category/${id}`);
      const data = await res.json();
      setName(data.name);
    };
    fetchCategory();
}, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();

  await fetch(`${API}/admin/category/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
     history.push("/admin/categories");
  };

  return (
    <div style={{padding: "20px",position:"absolute",left:"200px",bottom:"400px",top:'50px'}}>
    <form onSubmit={handleSubmit}>
      <h2>Edit Category</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="submit">Update</button>
    </form>
    </div>
  );
};

export default EditCategory;
