import React from 'react';
import { NavLink } from 'react-router-dom';

import { AiOutlineDashboard } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { LiaBuilding } from "react-icons/lia";
import { SlCalender } from "react-icons/sl";
import { BsCashCoin } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";

const AdminSideBar = ({ onLogout }) => {
  return (
    <div className='text-white fixed bottom-0 w-64 h-screen top-0 left-0 dark:bg-gray-900 flex flex-col justify-between'>
      
      {/* Sidebar Content */}
      <div>
        <div className='h-12 flex items-center justify-center bg-primary border-b-2'>
          <h3 className='font-bold text-2xl font-mono text-center'>HR Dynamics</h3>
        </div>
        <div className="space-y-2">
          <NavLink to='/admin-dashboard/' className={({ isActive }) => `${isActive ? "activeTab" : ""} flex items-center text-xl text-white pl-4 space-x-4 px-4 py-2.5 block navTab`} end>
            <AiOutlineDashboard />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to='/admin-dashboard/' className='flex items-center text-xl text-white pl-4 space-x-4 px-4 py-2.5 block navTab'>
            <GoPeople />
            <span>Employees</span>
          </NavLink>
          <NavLink to='/admin-dashboard/departments' className={({ isActive }) => `${isActive ? "activeTab" : ""} flex items-center text-xl text-white pl-4 space-x-4 px-4 py-2.5 block navTab`}>
            <LiaBuilding />
            <span>Departments</span>
          </NavLink>
          <NavLink to='/admin-dashboard/' className='flex items-center text-xl text-white pl-4 space-x-4 px-4 py-2.5 block navTab'>
            <SlCalender />
            <span>Leaves</span>
          </NavLink>
          <NavLink to='/admin-dashboard/' className='flex items-center text-xl text-white pl-4 space-x-4 px-4 py-2.5 block navTab'>
            <BsCashCoin />
            <span>Salary</span>
          </NavLink>
          <NavLink to='/admin-dashboard/' className='flex items-center text-xl text-white pl-4 space-x-4 px-4 py-2.5 block navTab'>
            <IoMdSettings />
            <span>Setting</span>
          </NavLink>
        </div>
      </div>

      {/* Logout Button at the bottom */}
      <div className="p-4">
        <button
          className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default AdminSideBar;
