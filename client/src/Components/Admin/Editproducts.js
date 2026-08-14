import React from 'react'
import { useState,useEffect } from "react"
import axios from "axios"
import { useParams,useHistory } from "react-router-dom";

function Editproducts() {
  const { id } = useParams();
  const history = useHistory()
    console.log(id)

    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [description,setDescription]=useState("")
    const [category,setCategory]=useState("")

    const [image,setImage]=useState(null)
      
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", image);
    
      await fetch(`http://localhost:5000/admin/product/${id}`, {
        method: "PUT",
        body: formData,
      });
       history.push('/admin/products')
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
        
          const { data } = await axios.get(`http://localhost:5000/admin/product/${id}`);
          console.log(data)
          
          setName(data.name);
          setPrice(data.price);
          setDescription(data.description);
          setCategory(data.category);
          setImage(data.image)
        } catch (error) {

          console.error(error);
        }
      };
    
      fetchData();
    }, [id]);
  
  return (
    <div style={{display:"inline-block",marginLeft:"300px",marginTop:"40px"}}>
    <h2>Edit Product</h2>
    
       
      <form id="productForm" encType="multipart/form-data" onSubmit={handleSubmit}>  
     <input type="text" id="name" value={name} placeholder="Product Name" onChange={(e)=>{setName(e.target.value)}} required/><br/>
     <input type="number" id="price" placeholder="Price" value={price} onChange={(e)=>{setPrice(e.target.value)}} required/><br/>
     <textarea id="description" placeholder="Description" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea><br/>
     <input type="text" id="category" value={category}  onChange={(e)=>{setCategory(e.target.value)}} placeholder="Category"/><br/>
      <input type="file"  onChange={(e)=>{setImage(e.target.files[0])}} id="image"/><br/>

        <button type="submit" style={{marginTop:"40px",backgroundColor:"green"}}>Update Product</button>

      </form>
      
      
    
 </div>


  )
}

export default Editproducts