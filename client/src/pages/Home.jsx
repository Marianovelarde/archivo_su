import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

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
        {/* ALTAS */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardActionArea onClick={() => navigate('/altas')}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FolderIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="subtitle1">
                    Ver Altas
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Consultar y filtrar altas registradas
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* NUEVA ALTA */}
        <Grid item xs={12} md={6}>
          <Card elevation={1}>
           <CardActionArea onClick={() => navigate('/altas/nueva')}>

              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AddCircleOutlineIcon sx={{ fontSize: 40 }} color="primary" />
                <Box>
                  <Typography variant="subtitle1" color="text.secondary">
                    Nueva Alta
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ingresar nueva alta de documentación técnica
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
