import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { expireSession } from '../../store/api/authSlice'
import SessionExpiredModal from '../modal/SessionExpiredModal'
import { MAX_IDLE_TIME } from '../../store/api/authConfig'

const SessionManager = () => {
  const dispatch = useDispatch()
  const sessionExpired = useSelector((state) => state.auth.sessionExpired)

  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const interval = setInterval(() => {
      const stored = localStorage.getItem('auth')
      if (!stored) return

      const { lastActivity } = JSON.parse(stored)
      if (!lastActivity) return

      if (Date.now() - lastActivity > MAX_IDLE_TIME) {
        dispatch(expireSession())
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [dispatch])

  return <SessionExpiredModal open={sessionExpired} />
}

export default SessionManager
