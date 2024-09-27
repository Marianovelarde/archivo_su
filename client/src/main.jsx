import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import DashBoard from './components/dashboard/Dashboard'
import {AuthProvider} from './components/auth/authProvider'
import ProtectedRoute from './components/protected/ProtectedRoute'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path: '/',
    element: <ProtectedRoute/>,
    children: [
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
