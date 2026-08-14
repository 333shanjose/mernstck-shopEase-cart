import React from 'react'
import AdminOrders from '../../Components/Admin/AdminOrders/AdminOrders'
import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'

function Orders() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <AdminOrders/>  
    </div>
  )
}

export default Orders