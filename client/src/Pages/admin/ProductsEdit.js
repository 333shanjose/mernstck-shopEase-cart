import React from 'react'
import Editproducts from '../../Components/Admin/Editproducts'

import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
function ProductsEdit() {
  return (
    <div>
       <Navbar/>
       <Sidebar/> 
       <Editproducts/>
    </div>
  )
}

export default ProductsEdit
