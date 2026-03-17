import { useParams, useNavigate } from 'react-router-dom'
import {useState} from 'react'
import { useGetAltaByIdQuery } from '../../store/api/altasApi'
import { canViewExpediente } from '../../utils/permissions'
import {
  Box,
  Typography,
  Grid,
  Divider,
  Paper,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useSelector } from 'react-redux'
import { canEditAlta } from '../../utils/permissions'


const Field = ({ label, value, highlight = false }) => (
  <Box>
    <Typography
      variant="subtitle2"
      sx={{
        fontWeight: highlight ? 450 : 500,
        fontSize: highlight ? '20px' : '13px',
        color: highlight ? 'primary.main' : 'text.secondary'
      }}
    >
      {label}
    </Typography>

    <Typography
      variant={highlight ? 'h6' : 'body1'}
      sx={{ fontWeight: highlight ? 1000 : 800 }}
    >
      {value || '—'}
    </Typography>
  </Box>
)

const AltaDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
   const { user } = useSelector((state) => state.auth)

  const { data, isLoading, isError } = useGetAltaByIdQuery(id)
const [openPropietario, setOpenPropietario] = useState(false)

  if (isLoading) return <Typography>Cargando...</Typography>
  if (isError) return <Typography>Error al cargar detalle</Typography>

  
  return (
    <Box sx={{ p: 3, backgroundColor: '#f4f5f7', minHeight: '100vh' }}>
      <Paper sx={{ p: 2 }}>
        {/* HEADER */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
       {canViewExpediente(user) && (
  <>
    <Typography variant="h4">
      Ficha Nº {data.num_de_ficha}
    </Typography>

    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ ml: 0.5, fontSize: '18px' }}
    >
      Expediente {data.num_de_exp}
    </Typography>
  </>
)}
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: 'left', md: 'right' } }}
          >
            <Chip
              size="medium"
              label={data.entityDestino.tipo_de_destino}
              color="primary"
              sx={{height: '50px', fontSize: '14px'}}
              
            />
            <Chip
              size="medium"
              label={data.entityPlano.tipo_plano}
              sx={{ ml: 3, height: '50px', marginLeft: '8px', fontSize: '14px' }}
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
    value={`${data.propietario.apellido ?? ''} ${data.propietario.nombre ?? ''}`}
    highlight
  />

  <Button
    size="small"
    sx={{ mt: 1 }}
    onClick={() => setOpenPropietario(true)}
  >
    Ver detalles
  </Button>

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
        <Typography variant="h6" sx={{ mb: 1 }}>
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
        <Typography variant="h6" sx={{ mb: 1 }}>
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
        <Typography variant="subtitle2" sx={{ mb: 1, fontSize: '25px'}}>
          Fechas administrativas
        </Typography>
    <Grid item xs={4}>
            <Field
              label="permiso de obra"
              value={data.permiso_de_obra}
            />
          </Grid>
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
<Divider sx={{ my: 1 }} />

<Typography variant="h6" sx={{ mb: 1 }}>
  Observaciones
</Typography>

<Box
  sx={{
    backgroundColor: '#fafafa',
    p: 2,
    borderRadius: 2,
    border: '1px solid #e0e0e0'
  }}
>
  <Typography variant="body1">
    {data.observaciones || '—'}
  </Typography>
</Box>
        {/* FOOTER */}
        <Box sx={{ mt: 2 }}>
          <Button
            size="small"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>
    {canEditAlta(user) && (
  <Button
    variant="contained"
    sx={{ ml: 2 }}
    onClick={() => navigate(`/altas/editar/${id}`)}
  >
    Editar
  </Button>
)}
</Box>
<Dialog
  open={openPropietario}
  onClose={() => setOpenPropietario(false)}
  maxWidth="sm"
  fullWidth
>

  <DialogTitle>
    Datos del propietario
  </DialogTitle>

  <DialogContent>

    <Grid container spacing={2} sx={{ mt: 1 }}>

      <Grid item xs={6}>
        <Field label="Nombre" value={data.propietario.nombre} />
      </Grid>

      <Grid item xs={6}>
        <Field label="Apellido" value={data.propietario.apellido} />
      </Grid>

      <Grid item xs={12}>
        <Field label="Domicilio postal" value={data.propietario.domicilio_postal} />
      </Grid>

      <Grid item xs={6}>
        <Field label="CUIL" value={data.propietario.cuil} />
      </Grid>

      <Grid item xs={6}>
        <Field label="Email" value={data.propietario.email} />
      </Grid>

    </Grid>

  </DialogContent>

  <DialogActions>

    <Button onClick={() => setOpenPropietario(false)}>
      Cerrar
    </Button>

  </DialogActions>

</Dialog>
      </Paper>
    </Box>
  )
}

export default AltaDetail
