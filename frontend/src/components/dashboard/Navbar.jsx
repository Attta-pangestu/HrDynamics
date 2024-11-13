import React from 'react';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className='flex justify-between bg-primary px-4 h-12 items-center'>
      <p style={{color:"#fff"}}>Welcome {user.name}</p>
    </div>
  );
};

export default Navbar;
