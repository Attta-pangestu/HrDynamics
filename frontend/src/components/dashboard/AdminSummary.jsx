import React from 'react';
import SummaryCard from './SummaryCard';

import { FaUser } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";

const AdminSummary = () => {
  return (
    <div className='p-6'>
      <h3 className='text-2xl font-bold'>Admin Dashboard</h3>
      {/* Grid layout for mobile and larger screens */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard heading="Total Employee" value="5" icon={<FaUser/>}/>
        <SummaryCard heading="Total Department" value="5" icon={<FaBuilding/>}/>
        <SummaryCard heading="Monthly Pay" value="250000" icon={<BsCashCoin/>}/>
      </div>

      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
        {/* Grid layout for leave details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <SummaryCard heading="Leave Applied" value="250000" icon={<BsCashCoin/>}/>
          <SummaryCard heading="Leave Approved" value="250000" icon={<BsCashCoin/>}/>
          <SummaryCard heading="Leave Pending" value="250000" icon={<BsCashCoin/>}/>
          <SummaryCard heading="Leave Rejected" value="250000" icon={<BsCashCoin/>}/>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
