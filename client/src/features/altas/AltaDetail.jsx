import { useParams, useNavigate } from 'react-router-dom'
import { useGetAltaByIdQuery } from '../../store/api/altasApi'
import {
  Box,
  Typography,
  Grid,
  Divider,
  Paper,
  Button,
  Chip,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Field = ({ label, value, highlight = false }) => (
  <Box>
    <Typography
      variant="caption"
      color={highlight ? 'primary' : 'text.secondary'}
      sx={{ fontWeight: highlight ? 600 : 400 }}
    >
      {label}
    </Typography>
    <Typography
      variant={highlight ? 'body1' : 'body2'}
      sx={{ fontWeight: highlight ? 600 : 500 }}
    >
      {value || '—'}
    </Typography>
  </Box>
)

const AltaDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetAltaByIdQuery(id)

  if (isLoading) return <Typography>Cargando...</Typography>
  if (isError) return <Typography>Error al cargar detalle</Typography>

  return (
    <Box sx={{ p: 3, backgroundColor: '#f4f5f7', minHeight: '100vh' }}>
      <Paper sx={{ p: 2 }}>
        {/* HEADER */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6">
              Ficha Nº {data.num_de_ficha}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Expediente {data.num_de_exp}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: 'left', md: 'right' } }}
          >
            <Chip
              size="small"
              label={data.entityDestino.tipo_de_destino}
              color="primary"
            />
            <Chip
              size="small"
              label={data.entityPlano.tipo_plano}
              sx={{ ml: 1 }}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 1 }} />

        {/* IDENTIFICACIÓN */}
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    <Field
      label="Propietario"
      value={`${data.propietario.nombre} ${data.propietario.apellido}`}
      highlight
    />
  </Grid>

  <Grid item xs={12} md={6}>
    <Field
      label="Calle"
      value={data.calle}
      highlight
    />
  </Grid>

  <Grid item xs={12} md={6}>
    <Field
      label="Barrio"
      value={data.barrio}
      highlight
    />
  </Grid>
</Grid>


        <Divider sx={{ my: 1 }} />

        {/* UBICACIÓN CATASTRAL */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Ubicación catastral
        </Typography>

  <Grid container spacing={2}>
  <Grid item xs={3}>
    <Field label="Distrito" value={data.distrito} highlight />
  </Grid>
  <Grid item xs={3}>
    <Field label="Zona" value={data.zona} highlight />
  </Grid>
  <Grid item xs={3}>
    <Field label="Manzana" value={data.manzana} highlight />
  </Grid>
  <Grid item xs={3}>
    <Field label="Parcela" value={data.parcela} highlight />
  </Grid>
</Grid>

        <Divider sx={{ my: 1 }} />

        {/* DATOS TÉCNICOS */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Datos técnicos
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Field
              label="Superficie cubierta (m²)"
              value={data.superficie_cubierta}
            />
          </Grid>

          <Grid item xs={8}>
            <Field
              label="Dirección técnica"
              value={data.direccion_tecnica}
            />
          </Grid>

          <Grid item xs={4}>
            <Field
              label="Matrícula profesional"
              value={data.matricula_profesional}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 1 }} />

        {/* FECHAS */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Fechas administrativas
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Field
              label="Fecha de aprobación"
              value={new Date(data.fecha_de_aprob).toLocaleDateString()}
            />
          </Grid>

          <Grid item xs={4}>
            <Field
              label="Final de obra"
              value={new Date(data.final_de_obra).toLocaleDateString()}
            />
          </Grid>

          <Grid item xs={4}>
            <Field
              label="Fecha de archivo"
              value={
                data.fecha_archivo
                  ? new Date(data.fecha_archivo).toLocaleDateString()
                  : '—'
              }
            />
          </Grid>
        </Grid>

        {/* FOOTER */}
        <Box sx={{ mt: 2 }}>
          <Button
            size="small"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default AltaDetail
