import React from 'react'
import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import EditCategory from '../../Components/Admin/EditCategory'

function AdminEditCategories() {
  return (
    <div>
     <Navbar/>
     <Sidebar/>
     <EditCategory/>

    </div>
  )
}

export default AdminEditCategories