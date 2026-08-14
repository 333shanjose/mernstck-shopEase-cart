import React,{useEffect} from "react";
import "./Categories.css";
import {useDispatch,useSelector} from "react-redux"
import { getCategories } from '../../reduxSlice/CategorySlice'


function Categories() {

    const dispatch=useDispatch()
    const categories=useSelector((state)=>{
      return state.categories.items
    })
    useEffect(()=>{
       dispatch(getCategories())
    },[dispatch])
  return (
    <section className="categories">
      <div className="container">
        <h2 className="category-title">Shop by Category</h2>

        <div className="category-grid">
          {categories.map((category) => (
            <div className="category-card" key={category._id}>
              <img src={`http://localhost:5000/uploads/${category.image}`} alt={category.name} />
              <div className="category-overlay">
                <h3>{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;