import { useState } from "react"
import { Outlet, Navigate } from "react-router-dom"
import {useAuth} from '../auth/AuthProvider.jsx'
const ProtectedRoute = () => {
    const auth = useAuth()

  return auth.isAuthenticated ? <Outlet/> : <Navigate to='/'/>
    
  
}

export default ProtectedRoute
