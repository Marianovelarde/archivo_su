import { Box, Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserList from './UsersList'

const AdminPanel = () => {
  const [section, setSection] = useState('users')
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        sx={{
          width: 240,
          backgroundColor: '#e3edf7',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Button
          size="small"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>

        <Typography variant="h6">Panel Admin</Typography>

        <Button
          fullWidth
          variant={section === 'users' ? 'contained' : 'text'}
          onClick={() => setSection('users')}
        >
          Gestionar usuarios
        </Button>

        <Button
          fullWidth
          variant={section === 'audit' ? 'contained' : 'text'}
          onClick={() => setSection('audit')}
        >
          Auditoría
        </Button>
      </Box>

      <Box sx={{ flex: 1, p: 3 }}>
        {section === 'users' && <UserList />}
        {section === 'audit' && <Typography>Auditoría</Typography>}
      </Box>
    </Box>
  )
}

export default AdminPanel
