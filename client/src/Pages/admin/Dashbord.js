import React from 'react'
import AdminDashbord from '../../Components/Admin/AdminDashboard/AdminDashboard'
import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'


function Dashbord() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <AdminDashbord/>
    </div>
  )
}

export default Dashbord