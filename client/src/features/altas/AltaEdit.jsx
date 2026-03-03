import { Box, 
    Grid, 
    TextField, 
    Button, 
    Typography, 
    Divider, 
    CircularProgress, 
    Paper, 
    Stack } 
from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGetAltaByIdQuery, useUpdateAltaMutation } from '../../store/api/altasApi'

import SelectPropietario from '../propietarios/SelectPropietario'
import SelectDestino from '../destino/SelectDestino'
import SelectPlano from '../planos/SelectPlano'

const AltaEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useGetAltaByIdQuery(id)
  const [updateAlta, { isLoading: isUpdating }] = useUpdateAltaMutation()

 const [form, setForm] = useState({}) 
 const [propietario, setPropietario] = useState(null) 
 const [destino, setDestino] = useState(null) 
 const [plano, setPlano] = useState(null)

  useEffect(() => {
    if (data) {
      setForm({
        ...data,
        fecha_de_aprob: data.fecha_de_aprob?.split('T')[0] || '',
        final_de_obra: data.final_de_obra?.split('T')[0] || '',
        fecha_archivo: data.fecha_archivo?.split('T')[0] || '',
      })

      setPropietario(data.propietario)
      setDestino(data.entityDestino)
      setPlano(data.entityPlano)
    }
  }, [data])
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
    const payload = {
      ...form,
   fecha_de_aprob: formatToISODate(form.fecha_de_aprob),
  final_de_obra: formatToISODate(form.final_de_obra),
  fecha_archivo: formatToISODate(form.fecha_archivo),
  id_propietario: propietario?.id_propietario,
  id_destino: destino?.id_destino,
  id_tipo_plano: plano?.id_tipo_plano
    }

    try {
      await updateAlta({ id, body: payload }).unwrap()
      navigate(`/altas/${id}`)
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
        <Grid item xs={12}> 
            <Typography variant="h6" fontWeight={600}> 
                Datos de expediente 
            </Typography> 
        </Grid> 
            <Grid item xs={12} md={3}>
                <TextField 
                label="N° de ficha" 
                name="num_de_ficha" 
                value={form.num_de_ficha || ''} 
                onChange={handleChange} fullWidth /> 
            </Grid> 
            <Grid item xs={12} md={3}> 
                <TextField 
                label="N° de expediente" 
                name="num_de_exp" 
                value={form.num_de_exp || ''} 
                onChange={handleChange} fullWidth /> 
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
                    Relaciones 
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
                         onChange={setPlano} /> 
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
                        <Button variant="outlined" onClick={() => navigate(-1)} > Cancelar </Button> <Button variant="contained" size="large" onClick={handleSubmit} disabled={isUpdating} > Actualizar Alta 
                            </Button> 
</Stack> 
</Grid> 
</Grid> 
     </Paper> 
            </Box> 
)
}

export default AltaEdit