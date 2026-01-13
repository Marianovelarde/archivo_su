import { Box, Container, Paper } from '@mui/material'
import Header from './Header'

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          {children}
        </Paper>
      </Container>
    </Box>
  )
}

export default MainLayout
