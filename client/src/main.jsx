import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './components/login/Login'
import Logout from './components/logout/Logout'
import Home from './components/home/Home'
import SignUp from './components/signup/SignUp'
import DashBoard from './components/dashboard/Dashboard'
import {AuthProvider} from './components/auth/authProvider'
import ProtectedRoute from './components/protected/ProtectedRoute'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AltaDeRegistro from './components/altas/AltaDeRegistro'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/registro",
    element: <AltaDeRegistro/>
  },
  {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path:'/logout',
    element: <Logout/>
  },
  {
    path: '/',
    element: <ProtectedRoute/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/dashboard',
        element: <DashBoard/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
