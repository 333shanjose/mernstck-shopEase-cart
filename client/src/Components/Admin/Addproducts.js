import { useState } from "react"
import React  from 'react'
import axios from 'axios'

function Addproducts() {
  const API = process.env.REACT_APP_API_URL;
  const [name,setName]=useState("")
  const [price,setPrice]=useState("")
  const [description,setDescription]=useState("")
  const [category,setCategory]=useState("")
  const [image,setImage]=useState("")


  const handleSubmit=async(e)=>{
    e.preventDefault();
      setName("")
      setPrice("")
      setDescription("")
      setCategory("")
      setImage("")




    const fileInput = document.getElementById('image');

    const formData = new FormData();
    formData.append("name", document.getElementById('name').value);
    formData.append("price", document.getElementById('price').value);
    formData.append("description", document.getElementById('description').value);
    formData.append("category", document.getElementById('category').value);
    formData.append("image", fileInput.files[0]);
    
     try{
       const res=await axios.post(`${API}/admin/add-products`,formData
        
       )
     }
     catch(error){
      console.log(error.message)
     }

      
    }
  return (
    <div style={{display:"inline-block",marginLeft:"300px",marginTop:"40px"}}>
        <h2>Add Product</h2>

       <form id="productForm" enctype="multipart/form-data" onSubmit={handleSubmit}>  
         <input type="text" id="name" value={name} placeholder="Product Name" onChange={(e)=>{setName(e.target.value)}} required/><br/>
         <input type="number" id="price" placeholder="Price" value={price} onChange={(e)=>{setPrice(e.target.value)}} required/><br/>
         <textarea id="description" placeholder="Description" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea><br/>
         <input type="text" id="category" value={category}  onChange={(e)=>{setCategory(e.target.value)}} placeholder="Category"/><br/>
          <input type="file" value={image} onChange={(e)=>{setImage(e.target.value)}} id="image"/><br/>

         <button type="submit" style={{marginTop:"40px",backgroundColor:"green"}}>Add Product</button>

      </form>
     </div>
  )
}

export default Addproducts