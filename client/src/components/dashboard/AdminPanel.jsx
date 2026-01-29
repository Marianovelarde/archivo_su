import { Box, Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useState } from 'react'
import UserList from './UsersList'
import { useNavigate } from 'react-router-dom'

const AdminPanel = () => {
  const [section, setSection] = useState('users')

  const navigate = useNavigate()




  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* MENÚ */}
      <Box
        sx={{
          width: 240,
          backgroundColor: '#e3edf7',
          p: 2,
        }}
      >
           <Box sx={{ mt: 2 }}>
                <Button
                  size="small"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate(-1)}
                >
                  Volver
                </Button>
              </Box>
        <Typography variant="h6" gutterBottom>
          Panel Admin
        </Typography>
 
        <Button
          fullWidth
          variant={section === 'users' ? 'contained' : 'text'}
          onClick={() => setSection('users')}
        >
          Gestionar usuarios
        </Button>
      </Box>

      {/* CONTENIDO */}
      <Box sx={{ flex: 1, p: 3 }}>
        {section === 'users' && <UserList />}
      </Box>
    </Box>
  )
}

export default AdminPanel
