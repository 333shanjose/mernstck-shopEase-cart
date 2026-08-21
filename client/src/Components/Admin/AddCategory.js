import { useState } from "react";
import { useHistory } from "react-router-dom";

const AddCategory = () => {
  const API = process.env.REACT_APP_API_URL;

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const res = await fetch(`${API}/admin/category`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      history.push("/admin/categories");
    } catch (err) {
      console.log(err);
    }
  };

  return (

     

    <div
      style={{
        padding: "20px",
        position: "absolute",
        left: "250px",
        top: "100px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2>Add Category</h2>

        <div>
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <br />

        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;