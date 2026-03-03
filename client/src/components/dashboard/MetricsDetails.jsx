import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button
} from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useGetMetricsQuery } from '../../store/api/adminApi'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const MetricsDetail = () => {

  const { pathname } = useLocation()
  const { data, isLoading } = useGetMetricsQuery()
  const navigate = useNavigate()
  if (isLoading) return <CircularProgress />

  const isBarrio = pathname.includes('barrios')

  const detailData = isBarrio
    ? data?.altasPorBarrio
    : data?.altasPorApellido

  const title = isBarrio
    ? 'Altas por Barrio'
    : 'Altas por Apellido'

  if (!detailData || detailData.length === 0) {
    return <Typography>No hay datos disponibles</Typography>
  }

  return (
    <Box>

      <Typography variant="h5" mb={3}>
        {title}
      </Typography>

      {/* GRÁFICO */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={detailData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={isBarrio ? 'barrio' : 'apellido'}
            />
            <YAxis />
            <Tooltip />
            <Bar 
  dataKey="cantidad" 
  fill="#4FC3F7" 
  radius={[6, 6, 0, 0]} 
/>
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* LISTA DETALLE */}
      <Paper sx={{ p: 2 }}>
        {detailData.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              py: 1,
              borderBottom: '1px solid #eee'
            }}
          >
            <Typography>
              {item.barrio || item.apellido}
            </Typography>
            <Typography fontWeight="bold">
              {item.cantidad}
            </Typography>
          </Box>
        ))}
      </Paper>
    <Box sx={{ mt: 2 }}>
          <Button
            size="small"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>
        </Box>
    </Box>
  )
}

export default MetricsDetail