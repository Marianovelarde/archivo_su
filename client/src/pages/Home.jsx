import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SearchIcon from '@mui/icons-material/Search'
//useNavigate para redireccionar a otras páginas, useSelector para acceder al estado de autenticación y permisos del usuario, useState para manejar el estado del modal de acceso denegado, y canCreateAlta para verificar si el usuario tiene permisos para crear una nueva alta.

import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useState } from 'react'
import  {canCreateAlta } from '../utils/permissions'


const Home = () => {
  
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const [openModal, setOpenModal] = useState(false)

// const handleNuevaAlta = () => {
//   if (!user || !user.isAdmin) {
//     setOpenModal(true)
//     return
//   }

//   navigate('/altas/nueva')
// }

  return (
    <Box>

      {/* TÍTULO */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sistema de Archivo Técnico
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gestión de documentación de obras privadas – Dirección de Suelo Urbano
        </Typography>
      </Box>

      {/* ACCESOS */}
      <Grid container spacing={3}>

        {/* VER ALTAS */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardActionArea onClick={() => navigate('/altas')}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FolderIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="subtitle1">
                    Ver Altas
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Listado general de altas
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* NUEVA ALTA (PROTEGIDA) */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardActionArea onClick={canCreateAlta(user) ? () => navigate('/altas/nueva') : () => setOpenModal(true)}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AddCircleOutlineIcon sx={{ fontSize: 40 }} color="primary" />
                <Box>
                  <Typography variant="subtitle1">
                    Nueva Alta
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ingresar nueva documentación
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* BUSCAR */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardActionArea onClick={() => navigate('/buscar')}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <SearchIcon sx={{ fontSize: 40 }} color="primary" />
                <Box>
                  <Typography variant="subtitle1">
                    Buscar
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Búsqueda avanzada por múltiples criterios
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

      </Grid>

      {/* MODAL ACCESO DENEGADO */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Acceso denegado</DialogTitle>
        <DialogContent>
          <Typography>
           <strong>{user?.usuario}</strong> no tienes permisos para acceder a esta función.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} variant="contained">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  )
}

export default Home