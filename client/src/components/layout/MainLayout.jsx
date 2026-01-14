import { Box, Container, Paper } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const MainLayout = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  )
}

export default MainLayout
