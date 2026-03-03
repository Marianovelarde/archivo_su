import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useState } from 'react'
import { useCreateAltaMutation } from '../../store/api/AltasApi'

import AltaSuccessModal from './AltasSuccessModal'
import SelectPropietario from '../propietarios/SelectPropietario'
import SelectDestino from '../destino/SelectDestino'
import SelectPlano from '../planos/SelectPlano'
import { useNavigate } from 'react-router-dom'

const AltaCreate = () => {
  const navigate = useNavigate()
  const [createAlta, { isLoading }] = useCreateAltaMutation()
const [successOpen, setSuccessOpen] = useState(false)
const [altaCreadaId, setAltaCreadaId] = useState(null)

  const [form, setForm] = useState({
    fecha_de_aprob: '',
    num_de_exp: '',
    num_de_ficha: '',
    calle: '',
    barrio: '',
    distrito: '',
    zona: '',
    manzana: '',
    parcela: '',
    superficie_cubierta: '',
    final_de_obra: '',
    direccion_tecnica: '',
    matricula_profesional: '',
    fecha_archivo: '',
    observaciones: '',
    permiso_de_obra: ''
  })

  const [propietario, setPropietario] = useState(null)
  const [destino, setDestino] = useState(null)
  const [plano, setPlano] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

const handleSubmit = async () => {
  if (!propietario || !destino || !plano) return

  const payload = {
    ...form,
    fecha_de_aprob: form.fecha_de_aprob || null,
    final_de_obra: form.final_de_obra || null,
    fecha_archivo: form.fecha_archivo || null,
    id_propietario: propietario.id_propietario,
    id_destino: destino.id_destino,
    id_tipo_plano: plano.id_tipo_plano,
  }

  try {
    const result = await createAlta(payload).unwrap()

    // 👇 este id viene del backend
    setAltaCreadaId(result.id_Altas)
    setSuccessOpen(true)
  } catch (error) {
    console.error('Error al crear alta', error)
  }
}



  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Nueva Alta
      </Typography>
    <Box sx={{ mt: 2 }}>
                <Button
                  size="small"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate(-1)}
                >
                  Volver
                </Button>
              </Box>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>

        {/* EXPEDIENTE */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="N° de ficha"
            name="num_de_ficha"
            value={form.num_de_ficha}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="N° de expediente"
            name="num_de_exp"
            value={form.num_de_exp}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Fecha de aprobación"
            name="fecha_de_aprob"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.fecha_de_aprob}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* UBICACIÓN */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Calle"
            name="calle"
            value={form.calle}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Barrio"
            name="barrio"
            value={form.barrio}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* CATASTRO */}
        <Grid item xs={12} sm={3}>
          <TextField label="Distrito" name="distrito" value={form.distrito} onChange={handleChange} fullWidth />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField label="Zona" name="zona" value={form.zona} onChange={handleChange} fullWidth />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField label="Manzana" name="manzana" value={form.manzana} onChange={handleChange} fullWidth />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField label="Parcela" name="parcela" value={form.parcela} onChange={handleChange} fullWidth />
        </Grid>

        {/* RELACIONES */}
        <Grid item xs={12} sm={6}>
          <SelectPropietario value={propietario} onChange={setPropietario} />
        </Grid>

        <Grid item xs={12} sm={3}>
          <SelectDestino value={destino} onChange={setDestino} />
        </Grid>

        <Grid item xs={12} sm={3}>
          <SelectPlano value={plano} onChange={setPlano} />
        </Grid>

        {/* TÉCNICOS */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Dirección técnica"
            name="direccion_tecnica"
            value={form.direccion_tecnica}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Matrícula profesional"
            name="matricula_profesional"
            value={form.matricula_profesional}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
<Grid item xs={12} md={3}>
  <TextField
    label="Permiso de obra"
    name="permiso_de_obra"
    value={form.permiso_de_obra || ''}
    onChange={handleChange}
    fullWidth
  />
</Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Superficie cubierta (m²)"
            name="superficie_cubierta"
            value={form.superficie_cubierta}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* FECHAS FINALES */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="Certificado final de obra"
            name="final_de_obra"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.final_de_obra}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Fecha archivo central"
            name="fecha_archivo"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.fecha_archivo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
<TextField
  label="Observaciones"
  name="observaciones"
  value={form.observaciones || ''}
  onChange={handleChange}
  fullWidth
  multiline
  rows={3}
/>
        {/* BOTÓN */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Guardar Alta
          </Button>
        </Grid>
      </Grid>

 <AltaSuccessModal
  open={successOpen}
  onClose={() => setSuccessOpen(false)}
  altaId={altaCreadaId}
/>

    </Box>
  )
}

export default AltaCreate
