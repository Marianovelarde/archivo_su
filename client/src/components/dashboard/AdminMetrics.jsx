import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useGetMetricsQuery } from '../../store/api/adminApi'

const AdminMetrics = () => {

  const navigate = useNavigate()
  const { data, isLoading } = useGetMetricsQuery()

  if (isLoading) return <CircularProgress />

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Dashboard de Métricas
      </Typography>

      <Grid container spacing={3}>

        {/* TOTAL ALTAS */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1">
              Total de Altas
            </Typography>
            <Typography variant="h4">
              {data?.totalAltas}
            </Typography>
          </Paper>
        </Grid>

        {/* ALTAS POR BARRIO */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{ p: 3, cursor: 'pointer' }}
            onClick={() =>
             navigate('/metrics', { state: { type: 'barrio' } })
            }
          >
            <Typography variant="subtitle1">
              Altas por Barrio
            </Typography>
            <Typography variant="h6">
              Ver detalle
            </Typography>
          </Paper>
        </Grid>

        {/* ALTAS POR APELLIDO */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{ p: 3, cursor: 'pointer' }}
            onClick={() =>
            navigate('/metrics', { state: { type: 'apellido' } })
            }
          >
            <Typography variant="subtitle1">
              Altas por Apellido
            </Typography>
            <Typography variant="h6">
              Ver detalle
            </Typography>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  )
}

export default AdminMetrics