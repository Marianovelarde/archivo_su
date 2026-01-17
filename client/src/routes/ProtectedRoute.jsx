import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  // 1️⃣ No logueado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // 2️⃣ Ruta solo admin
  if (adminOnly && !user?.isAdmin) {
    return <Navigate to="/" replace />
  }

  // 3️⃣ OK
  return children
}

export default ProtectedRoute
