import { Box, 
    Grid, 
    TextField, 
    Button, 
    Typography, 
    Divider, 
    CircularProgress, 
    Paper, 
    Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions } 
from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGetAltaByIdQuery, useUpdateAltaMutation } from '../../store/api/altasApi'

import SelectPropietario from '../propietarios/SelectPropietario'
import SelectDestino from '../destino/SelectDestino'
import SelectPlano from '../planos/SelectPlano'
import { logger } from 'sequelize/lib/utils/logger'

const AltaEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useGetAltaByIdQuery(id)
  const [updateAlta, { isLoading: isUpdating }] = useUpdateAltaMutation()

  const [planos, setPlanos] = useState([])
 const [form, setForm] = useState({}) 
 const [propietario, setPropietario] = useState(null) 
 const [destino, setDestino] = useState(null) 
 const [plano, setPlano] = useState(null)
 const [openModal, setOpenModal] = useState(false)

 console.log('Datos del alta:', data)
useEffect(() => {
  if (data) {

    let exp_num = ''
    let exp_year = ''
    let ficha_num = ''
    let ficha_letra = ''

    if (data.num_de_exp) {
      const [num, , year] = data.num_de_exp.split('-')
      exp_num = num
      exp_year = year
    }

    if (data.num_de_ficha) {
      const [num, letra] = data.num_de_ficha.split('-')
      ficha_num = num
      ficha_letra = letra
    }

    setForm({
      ...data,

      exp_num,
      exp_year,

      ficha_num,
      ficha_letra,

      fecha_de_aprob: data.fecha_de_aprob?.split('T')[0] || '',
      final_de_obra: data.final_de_obra?.split('T')[0] || '',
      fecha_archivo: data.fecha_archivo?.split('T')[0] || '',
    })

    setPropietario(data.propietario)
    setDestino(data.entityDestino)
    setPlano(data.entityPlano)
  }
}, [data])

const tienePlano = !!plano

const formatToISODate = (date) => {
  if (!date) return null

  // si ya viene en formato yyyy-mm-dd lo dejamos
  if (date.includes('-')) return date

  const [day, month, year] = date.split('/')
  return `${year}-${month}-${day}`
}
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
const handleSubmit = async () => {
  const expediente = `${form.exp_num}-31-${form.exp_year}`
  const ficha = `${form.ficha_num}-${form.ficha_letra}`

  const payload = {
    ...form,
    num_de_exp: expediente,
    num_de_ficha: ficha,
    fecha_de_aprob: formatToISODate(form.fecha_de_aprob),
    final_de_obra: formatToISODate(form.final_de_obra),
    fecha_archivo: formatToISODate(form.fecha_archivo),
    id_propietario: propietario?.id_propietario,
    id_destino: destino?.id_destino,
    id_tipo_plano: plano?.id_tipo_plano
  }

  try {
    // 🔥 SI HAY ARCHIVOS → usar FormData
    if (planos.length > 0) {
      const formData = new FormData()

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value)
        }
      })

      // 👇 CLAVE
      planos.forEach(file => {
        formData.append('planos', file)
      })

      await updateAlta({ id, body: formData }).unwrap()

    } else {
      // 👇 sin archivos
      await updateAlta({ id, body: payload }).unwrap()
    }

    setOpenModal(true)

  } catch (error) {
    console.error('Error al actualizar', error)
  }
}

  if (isLoading) return <CircularProgress />

  return ( 
  <Box 
  sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh', p: 4 }}> 
  <Paper elevation={3} 
  sx={{ p: 4, borderRadius: 3, maxWidth: 1200, mx: 'auto' }}
  > <Typography variant="h4" fontWeight={600} gutterBottom> 
  Editar Alta </Typography> 
  <Typography variant="subtitle2" color="text.secondary" mb={3}> 
    Modifique los campos necesarios y guarde los cambios 
    </Typography> 
    <Divider sx={{ mb: 4 }} /> 
    <Grid container spacing={3}> 
        {/* =================== EXPEDIENTE =================== */} 
        <Grid item xs={11}> 
            <Typography variant="h6" fontWeight={600} sx={{marginLeft: -3, marginBottom: 1}}>Datos de expediente 
            </Typography> 
        </Grid> 
<Grid container spacing={1}>
  <Grid item xs={2}>
    <TextField
      label="Ficha Nº"
      name="ficha_num"
      value={form.ficha_num}
      onChange={handleChange}
      fullWidth
    />
  </Grid>

  <Grid item xs={1}>
    <TextField value="-" disabled fullWidth />
  </Grid>

  <Grid item xs={2} sx={{marginRight: 5, marginBottom: 2}}>
    <TextField
      label="Letra"
      name="ficha_letra"
      value={form.ficha_letra}
      onChange={handleChange}
      fullWidth
    />
  </Grid>



  <Grid item xs={2}>
    <TextField
      label="N° Expediente"
      name="exp_num"
      value={form.exp_num}
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
      name="exp_year"
      value={form.exp_year}
      onChange={handleChange}
      fullWidth
    />
  </Grid>




               
                 {/* =================== UBICACIÓN =================== */} 
                <Grid 
                item xs={12} mt={2}> 
                <Divider /> 
            </Grid> 
                <Grid item xs={12}> 
                    <Typography variant="h6" fontWeight={600}> 
                        Ubicación 
                    </Typography> 
                </Grid> 
            <Grid item xs={12} md={6}> 
                <TextField 
                label="Calle" 
                name="calle" 
                value={form.calle || ''} 
                onChange={handleChange} fullWidth /> 
            </Grid> 
            <Grid item xs={12} md={3}> 
                <TextField 
                label="Barrio" 
                name="barrio" 
                value={form.barrio || ''} 
                onChange={handleChange} fullWidth /> 
                </Grid> 
                {/* =================== CATASTRO =================== */} 
                <Grid item xs={12} md={3}> 
                    <TextField 
                    label="Distrito" 
                    name="distrito" 
                    value={form.distrito || ''} 
                    onChange={handleChange} fullWidth /> 
                </Grid> 
                <Grid item xs={12} md={3}> 
                    <TextField 
                    label="Zona" 
                    name="zona" 
                    value={form.zona || ''} 
                    onChange={handleChange} fullWidth /> 
                    </Grid> 
                    <Grid item xs={12} md={3}> 
                        <TextField 
                        label="Manzana" 
                        name="manzana" 
                        value={form.manzana || ''} 
                        onChange={handleChange} fullWidth /> 
                        </Grid> 
                    <Grid item xs={12} md={3}> 
                        <TextField 
                        label="Parcela" 
                        name="parcela" 
                        value={form.parcela || ''} 
                        onChange={handleChange} fullWidth /> 
                        </Grid> 
                        
                {/* =================== RELACIONES =================== */} 
                <Grid item xs={12} mt={2}> 
                    <Divider /> 
                </Grid> 
                <Grid item xs={12}> 
                    <Typography 
                    variant="h6" 
                    fontWeight={600}> 
                    Propietario - Destino - Plano 
                    </Typography> 
                </Grid> 
                <Grid item xs={12} md={6}> 
                    <SelectPropietario 
                    value={propietario} 
                    onChange={setPropietario} /> 
                </Grid> 
                <Grid item xs={12} md={3}> 
                    <SelectDestino 
                    value={destino} 
                    onChange={setDestino} /> 
                </Grid> 
                    <Grid item xs={12} md={3}>
  <SelectPlano 
    value={plano} 
    onChange={setPlano} 
  /> 
</Grid>

{/* 👇 SOLO SI NO HAY PLANO */}
{(!data?.planos || data.planos.length === 0) && (
<Grid item xs={12} md={6}>
  <Button
    variant={planos.length ? 'contained' : 'outlined'}
    component="label"
    fullWidth
  >
    {planos.length
      ? `${planos.length} nuevos planos ✔`
      : 'Agregar planos (PDF)'}

    <input
      type="file"
      accept="application/pdf"
      multiple
      hidden
      onChange={(e) => {
        const nuevos = Array.from(e.target.files)
        setPlanos(prev => [...prev, ...nuevos])
      }}
    />
  </Button>
</Grid>
)}
{data?.planos?.length > 0 && (
  <Grid item xs={12}>
    <Typography variant="h6" fontWeight={600}>
      Planos existentes:
    </Typography>

    {data.planos.map((p, i) => (
      <Typography key={i} variant="body2">
        📄  {i + 1} {data.planos[i]?.nombre || '—'}
      </Typography>
    ))}
  </Grid>
)}
<Grid item xs={12} md={6}>
  <Button
    variant={planos.length ? 'contained' : 'outlined'}
    component="label"
    fullWidth
  >
    {planos.length
      ? `${planos.length} nuevos planos ✔`
      : 'Agregar planos (PDF)'}

    <input
      type="file"
      accept="application/pdf"
      multiple
      hidden
      onChange={(e) => {
        const nuevos = Array.from(e.target.files)
        setPlanos(prev => [...prev, ...nuevos])
      }}
    />
  </Button>
</Grid>
                {/* =================== DATOS TÉCNICOS =================== */} 
                <Grid item xs={12} mt={2}> 
                    <Divider /> 
                </Grid> 
                <Grid item xs={12}> 
                    <Typography 
                    variant="h6" 
                    fontWeight={600}> 
                    Datos técnicos 
                    </Typography> 
                </Grid> 
                <Grid item xs={12} md={4}>
                    <TextField 
                    label="Superficie cubierta (m²)" 
                    name="superficie_cubierta" 
                    value={form.superficie_cubierta || ''} 
                    onChange={handleChange} fullWidth />
                </Grid> 
                <Grid item xs={12} md={4}> 
                    <TextField
                    label="Dirección técnica" 
                    name="direccion_tecnica" 
                    value={form.direccion_tecnica || ''} 
                    onChange={handleChange} fullWidth />
                </Grid> 
                <Grid item xs={12} md={4}> 
                    <TextField 
                    label="Matrícula profesional" 
                    name="matricula_profesional" 
                    value={form.matricula_profesional || ''}
                     onChange={handleChange} fullWidth />
                     </Grid> 
                     <Grid item xs={12} md={3}>
                    <TextField
                      label="Permiso de obra"
                        name="permiso_de_obra"
                        value={form.permiso_de_obra || ''}
                        fullWidth
                        onChange={handleChange}
  />
</Grid>
                     {/* =================== FECHAS =================== */} 
                     <Grid item xs={12} mt={2}> 
                        <Divider /> 
                    </Grid> 
                    <Grid item xs={12}> 
                        <Typography 
                        variant="h6" 
                        fontWeight={600}> 
                        Fechas administrativas 
                        </Typography> 
                    </Grid> 
                     <Grid item xs={12} md={3}> 
                 <TextField 
                 label="Fecha aprobación" 
                 type="date" 
                 name="fecha_de_aprob" 
                 InputLabelProps={{ shrink: true }} 
                 value={form.fecha_de_aprob || ''} 
                 onChange={handleChange} fullWidth /> 
                 </Grid> 
                    <Grid item xs={12} md={4}> 
                        <TextField 
                        type="date" 
                        label="Final de obra" 
                        name="final_de_obra" 
                        InputLabelProps={{ shrink: true }} 
                        value={form.final_de_obra || ''} 
                        onChange={handleChange} fullWidth /> 
                    </Grid> 
                    <Grid item xs={12} md={4}> 
                        <TextField 
                        type="date" 
                        label="Fecha archivo" 
                        name="fecha_archivo" 
                        InputLabelProps={{ shrink: true }} 
                        value={form.fecha_archivo || ''} 
                        onChange={handleChange} fullWidth /> 
                    </Grid> 
                    {/* =================== OBSERVACIONES =================== */}
<Grid item xs={12} mt={2}>
  <Divider />
</Grid>

<Grid item xs={12}>
  <Typography variant="h6" fontWeight={600}>
    Observaciones
  </Typography>
</Grid>

<Grid item xs={12}>
  <TextField
    label="Observaciones"
    name="observaciones"
    value={form.observaciones || ''}
    onChange={handleChange}
    fullWidth
    multiline
    rows={4}
  />
</Grid>
                        {/* =================== BOTONES =================== */} 
                    
                    <Grid item xs={12} mt={4}> 
                        <Stack 
                        direction="row" 
                        spacing={2} 
                        justifyContent="flex-end"> 
                        <Button variant="outlined" onClick={() => navigate('/')} > Cancelar </Button> <Button variant="contained" size="large" onClick={handleSubmit} disabled={isUpdating} > Actualizar Alta 
                            </Button> 
</Stack> 
</Grid> 
</Grid> 
</Grid>
     </Paper> 
     <Dialog open={openModal}>
  <DialogTitle>Alta modificada</DialogTitle>

  <DialogContent>
    <Typography>
      Los cambios se guardaron correctamente.
    </Typography>
  </DialogContent>

  <DialogActions>

    <Button
      variant="contained"
      onClick={() => navigate(`/altas/${id}`)}
    >
      Ver Alta
    </Button>

    <Button
      variant="outlined"
      onClick={() => navigate("/altas")}
    >
      Volver a la lista
    </Button>

  </DialogActions>
</Dialog>
            </Box> 
)
}

export default AltaEdit