import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
} from '@mui/material'
import { useState } from 'react'
import { useCreateAltaMutation } from '../../store/api/AltasApi'

import SelectPropietario from '../propietarios/SelectPropietario'
import SelectDestino from '../destino/SelectDestino'
import SelectPlano from '../planos/SelectPlano'
import { useNavigate } from 'react-router-dom'

const AltaCreate = () => {
  const navigate = useNavigate()
  const [createAlta, { isLoading }] = useCreateAltaMutation()

  const [form, setForm] = useState({
    num_de_ficha: '',
    calle: '',
    barrio: '',
    distrito: '',
    zona: '',
    manzana: '',
    parcela: '',
  })

  const [propietario, setPropietario] = useState(null)
  const [destino, setDestino] = useState(null)
  const [plano, setPlano] = useState(null)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    if (!propietario || !destino || !plano) return

    const payload = {
      ...form,
      id_propietario: propietario.id_propietario,
      id_destino: destino.id_destino,
      id_tipo_plano: plano.id_tipo_plano,
    }

    await createAlta(payload)
    navigate('/altas/nueva')
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Nueva Alta
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        {/* FICHA */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="N° de ficha"
            name="num_de_ficha"
            value={form.num_de_ficha}
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

        {/* DATOS CATASTRALES */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="Distrito"
            name="distrito"
            value={form.distrito}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Zona"
            name="zona"
            value={form.zona}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Manzana"
            name="manzana"
            value={form.manzana}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Parcela"
            name="parcela"
            value={form.parcela}
            onChange={handleChange}
            fullWidth
          />
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
    </Box>
  )
}

export default AltaCreate
