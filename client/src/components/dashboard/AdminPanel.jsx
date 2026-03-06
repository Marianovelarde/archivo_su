import { Box, Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import UserList from './UsersList'
import AdminMetrics from './adminMetrics'
import DestinoAdmin from './DestinoAdmin'
import PropietariosAdmin from './PropietariosAdmin'

const AdminPanel = () => {

  const [section, setSection] = useState('users')
  const navigate = useNavigate()

  return (

    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

      {/* SIDEBAR */}
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

        <Typography variant="h6">
          Panel Admin
        </Typography>

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

        <Button
          fullWidth
          variant={section === 'metrics' ? 'contained' : 'text'}
          onClick={() => setSection('metrics')}
        >
          Métricas
        </Button>

        <Button
          fullWidth
          variant={section === 'destinos' ? 'contained' : 'text'}
          onClick={() => setSection('destinos')}
        >
          Destinos
        </Button>
        <Button
         fullWidth
        variant={section === 'propietarios' ? 'contained' : 'text'}
        onClick={() => setSection('propietarios')}
        >
        Propietarios
</Button>
      </Box>


      {/* CONTENIDO */}
      <Box sx={{ flex: 1, p: 3 }}>

        {section === 'users' && <UserList />}

        {section === 'audit' && (
          <Typography>
            Auditoría
          </Typography>
        )}
        {section === 'propietarios' && <PropietariosAdmin />}
        {section === 'metrics' && <AdminMetrics />}

        {section === 'destinos' && <DestinoAdmin />}

      </Box>

    </Box>

  )
}

export default AdminPanel