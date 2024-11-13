// import React, { useState } from 'react';
// import { useAuth } from '../context/authContext';
// import AdminSideBar from '../components/dashboard/AdminSideBar';
// import Navbar from '../components/dashboard/Navbar';
// import AdminSummary from '../components/dashboard/AdminSummary';

// const AdminDashboard = () => {
//   const { user, logout } = useAuth(); // Assuming you have a logout function in your auth context
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  
//   return (
//       <div className="flex h-screen">
//       {/* Sidebar */}
//       <AdminSideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} onLogout={handleLogout} />
      
//       {/* Main Content */}
//       <div className="ml-0 md:ml-64 flex-1 h-screen">
//         <Navbar />
//         <AdminSummary />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



// const handleLogout = () => {
//     logout(); // Call your logout function
//   };
// const [isSidebarOpen, setIsSidebarOpen] = useState(false);


import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSideBar from '../components/dashboard/AdminSideBar'
import Navbar from '../components/dashboard/Navbar'
// import AdminSummary from '../components/dashboard/AdminSummary'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
    const {user,logout} = useAuth()

  return (
    <div className="flex">
        <AdminSideBar onLogout={logout}/>
        <div className="ml-64 flex-1 h-screen relative items-start justify-center">
            <Navbar/>
            <Outlet/>
        </div>
    </div>
  )
}

export default AdminDashboard