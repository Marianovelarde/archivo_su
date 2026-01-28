import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import UserList from './UsersList'

const AdminPanel = () => {
  const [section, setSection] = useState('users')

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
