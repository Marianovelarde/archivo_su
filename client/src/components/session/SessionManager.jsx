import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { expireSession } from '../../store/api/authSlice'
import SessionExpiredModal from '../modal/SessionExpiredModal'
import { MAX_IDLE_TIME } from '../../store/api/authConfig'

const SessionManager = () => {
  const dispatch = useDispatch()
const { isAuthenticated,  sessionExpired } = useSelector(
  (state) => state.auth
)

useEffect(() => {
  if (!isAuthenticated) return

  const interval = setInterval(() => {
    const stored = localStorage.getItem('auth')
    if (!stored) return

    const { lastActivity } = JSON.parse(stored)

    if (Date.now() - lastActivity > MAX_IDLE_TIME) {
      dispatch(expireSession())
    }
  }, 5000)

  return () => clearInterval(interval)
}, [isAuthenticated])


  return <SessionExpiredModal open={sessionExpired} />
}

export default SessionManager
