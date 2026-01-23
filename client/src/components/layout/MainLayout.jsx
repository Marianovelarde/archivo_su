import { Box, Container, Paper } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'

import { useDispatch, useSelector } from 'react-redux'
import { updateActivity } from '../../store/api/authSlice'
import { useEffect } from 'react'
import AppBreadcrumbs from '../navigation/AppBreadcrumbs'

const MainLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const events = ['click', 'mousemove', 'keydown', 'scroll']

    const handleActivity = () => {
      dispatch(updateActivity())
    }

    events.forEach((e) =>
      window.addEventListener(e, handleActivity)
    )

    return () => {
      events.forEach((e) =>
        window.removeEventListener(e, handleActivity)
      )
    }
  }, [dispatch])

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <AppBreadcrumbs />
        <Paper sx={{ p: 3 }}>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  )
}

export default MainLayout
