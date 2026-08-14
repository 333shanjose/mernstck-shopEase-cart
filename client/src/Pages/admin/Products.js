import React from 'react'
import AdminProducts from '../../Components/Admin/AdminProducts'
import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'

function Products() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <AdminProducts/>  
    </div>
  )
}

export default Products