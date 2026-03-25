import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
    Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText
  
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useState } from 'react'
import { useCreateAltaMutation } from '../../store/api/AltasApi'

import AltaErrorModal from './AltaErrorModal'
import AltaSuccessModal from './AltasSuccessModal'
import AltaFichaDuplicadaModal from './AltaFichaDuplicadaModal'

import SelectPropietario from '../propietarios/SelectPropietario'
import SelectDestino from '../destino/SelectDestino'
import SelectPlano from '../planos/SelectPlano'
import { useNavigate } from 'react-router-dom'

const AltaCreate = () => {
  const navigate = useNavigate()
  const [createAlta, { isLoading }] = useCreateAltaMutation()

  //estados para el formulario
const [files, setFiles] = useState([])
const [successOpen, setSuccessOpen] = useState(false)
const [altaCreadaId, setAltaCreadaId] = useState(null)
const [errorOpen, setErrorOpen] = useState(false)
const [missingFields, setMissingFields] = useState([])
const [duplicateOpen, setDuplicateOpen] = useState(false)


const [form, setForm] = useState({
  ficha_numero: '',
  ficha_letra: '',
  exp_numero: '',
  exp_final: '',
  fecha_de_aprob: '',
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
  const faltantes = []

  if(!form.ficha_numero) faltantes.push('Número de ficha')
  if (!propietario?.nombre) faltantes.push('Nombre del propietario')
  if (!propietario?.apellido) faltantes.push('Apellido del propietario')
  if (!form.calle) faltantes.push('Calle')
    if (!form.barrio) faltantes.push('Barrio')
      if(!form.distrito) faltantes.push('Distrito')
      if(!form.zona) faltantes.push('Zona')
      if(!form.manzana) faltantes.push('Manzana')
      if(!form.parcela) faltantes.push('Parcela - Si no hay debe ser 0')
  if (!form.matricula_profesional) faltantes.push('Matrícula profesional')
  if (!form.superficie_cubierta) faltantes.push('Superficie cubierta. Solo Numeros')
  if(!form.fecha_de_aprob) faltantes.push('Fecha de aprobación')



  if (faltantes.length > 0) {
    setMissingFields(faltantes)
    setErrorOpen(true)
    return
  }

  if (!propietario || !destino || !plano) return

const expediente =
  form.exp_numero && form.exp_final
    ? `${form.exp_numero}-31-${form.exp_final}`
    : null

const ficha =
  form.ficha_numero && form.ficha_letra
    ? `${form.ficha_numero}-${form.ficha_letra.toUpperCase()}`
    : null

const payload = {
  ...form,
  num_de_ficha: ficha,
  num_de_exp: expediente,
  fecha_de_aprob: form.fecha_de_aprob || null,
  final_de_obra: form.final_de_obra || null,
  fecha_archivo: form.fecha_archivo || null,
  id_propietario: propietario.id_propietario,
  id_destino: destino.id_destino,
  id_tipo_plano: plano.id_tipo_plano,
  distrito: form.distrito,
  zona: form.zona,
  manzana: form.manzana,
  parcela: form.parcela
}

 try {

  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value)
    }
  })

  // 🔥 archivo PDF
 files.forEach(file => {
  formData.append('planos', file)
})

  const result = await createAlta(formData).unwrap()

  setAltaCreadaId(result.id_Altas)
  setSuccessOpen(true)

} catch (error) {
  console.error('Error al crear alta', error)

  const msg =
    error?.data?.error ||
    error?.error ||
    error?.message

  if (msg === 'La ficha ya existe') {
    setDuplicateOpen(true)

    setTimeout(() => {
      document.querySelector('[name="ficha_numero"]')?.focus()
    }, 100)

    return
  }
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

     <Grid container spacing={1}>
  <Grid item xs={2}>
    <TextField
      label="Ficha Nº"
      name="ficha_numero"
      value={form.ficha_numero}
      onChange={handleChange}
      fullWidth
    />
  </Grid>

  <Grid item xs={1}>
    <TextField value="-" disabled fullWidth />
  </Grid>

  <Grid item xs={2} sx={{marginRight: 15, marginBottom: 2}}>
    <TextField
      label="Letra"
      name="ficha_letra"
      value={form.ficha_letra}
      onChange={handleChange}
      fullWidth
    />
  </Grid>



  <Grid item xs={1}>
    <TextField
      label="N° Expediente"
      name="exp_numero"
      value={form.exp_numero}
      onChange={handleChange}
      fullWidth
    />
  </Grid>

  <Grid item xs={1}>
    <TextField value="-" disabled fullWidth />
  </Grid>

  <Grid item xs={1}>
    <TextField value="31" disabled fullWidth />
  </Grid>

  <Grid item xs={1}>
    <TextField value="-" disabled fullWidth />
  </Grid>

  <Grid item xs={1}>
    <TextField
      label="Año"
      name="exp_final"
      value={form.exp_final}
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
<Grid item xs={12} sm={6}>
<Button
  variant={files.length ? 'contained' : 'outlined'}
  color={files.length ? 'success' : 'primary'}
  component="label"
  fullWidth
>
  {files.length
    ? `${files.length} planos cargados ✔`
    : 'Subir planos (PDF)'}

  <input
    type="file"
    accept="application/pdf"
    multiple
    hidden
    onChange={(e) => {
  const nuevos = Array.from(e.target.files)
  setFiles(prev => [...prev, ...nuevos])
}}
  />
</Button>
{files.map((f, i) => (
  <Typography key={i} variant="body2">
    {f.name}
  </Typography>
))}
</Grid>
        {/* TÉCNICOS */}
        <Grid item xs={12} sm={6} sx={{marginBottom: 2}}>
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
        <Grid item xs={12} sm={3} sx={{marginBottom: 2}}>
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
<AltaErrorModal
  open={errorOpen}
  onClose={() => setErrorOpen(false)}
  missingFields={missingFields}
/>
<AltaFichaDuplicadaModal
  open={duplicateOpen}
  onClose={() => setDuplicateOpen(false)}
/>
    </Box>
  )
}

export default AltaCreate
