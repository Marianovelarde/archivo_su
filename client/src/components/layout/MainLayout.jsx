import { Box, Container, Paper } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import SessionExpiredModal from '../modal/SessionExpiredModal'
import { useDispatch, useSelector } from 'react-redux'
import { updateActivity } from '../../store/api/authSlice'
import { useEffect } from 'react'

const MainLayout = () => {
  const dispatch = useDispatch()

  // ✅ HOOK ARRIBA
  const { sessionExpired } = useSelector((state) => state.auth)

  useEffect(() => {
    const events = ['click', 'mousemove', 'keydown', 'scroll']

    const handleActivity = () => {
      dispatch(updateActivity())
    }

    events.forEach((event) =>
      window.addEventListener(event, handleActivity)
    )

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      )
    }
  }, [dispatch])
  useEffect(() => {
  const interval = setInterval(() => {
    const stored = localStorage.getItem('auth')
    if (!stored) return

    const { lastActivity } = JSON.parse(stored)

    if (Date.now() - lastActivity > 60 * 1000) {
      dispatch(updateActivity())
    }
  }, 5000) // chequea cada 5 segundos

  return () => clearInterval(interval)
}, [dispatch])

  return (
    <>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Header />

        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>

      {/* MODAL FUERA DEL LAYOUT */}
      <SessionExpiredModal open={sessionExpired} />
    </>
  )
}

export default MainLayout
