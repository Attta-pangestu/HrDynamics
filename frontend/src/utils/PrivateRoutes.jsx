import React from 'react'
import {Navigate} from 'react-router-dom'
import { useAuth } from '../context/authContext'

const PrivateRoutes = ({children}) => {
    const {user,loading} = useAuth()
    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-4 border-gray-300 border-t-primary"></div>
            <span className="ml-4 text-xl font-semibold text-gray-700">Loading...</span>
          </div>
        );
    }
    return user ? children : <Navigate to='/login'/>
}

export default PrivateRoutes