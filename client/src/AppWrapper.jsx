import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  restoreSession,
  expireSession,
} from './store/api/authSlice'

const INACTIVITY_LIMIT =  60 * 1000

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch()
  const { lastActivity, isAuthenticated } = useSelector(
    (state) => state.auth
  )

  // Restaurar sesión
  useEffect(() => {
    const stored = localStorage.getItem('auth')
    if (!stored) return

    const parsed = JSON.parse(stored)
    dispatch(restoreSession(parsed))
  }, [])

  // Verificar expiración
  useEffect(() => {
    if (!isAuthenticated || !lastActivity) return

    const interval = setInterval(() => {
      if (Date.now() - lastActivity > INACTIVITY_LIMIT) {
        dispatch(expireSession())
      }
    }, 5000) // chequeo cada 5s

    return () => clearInterval(interval)
  }, [lastActivity, isAuthenticated])

  return children
}

export default AppWrapper
