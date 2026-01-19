import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
const SESSION_TIMEOUT = 15 * 60 * 1000

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const dispatch = useDispatch()

  
  const { isAuthenticated, user, lastActivity, logout } = useSelector(
    (state) => state.auth
  )

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
 }
  if (Date.now() - lastActivity > SESSION_TIMEOUT) {
    dispatch(logout())
    return <Navigate to="/login" replace />
  }

  if (adminOnly && !user?.isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}


export default ProtectedRoute
