import { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  TextField,
  Paper,
  Button,
  MenuItem,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress
} from '@mui/material'
import { useLazySearchAltasQuery } from '../store/api/altasApi'
import { useNavigate } from 'react-router-dom'

const BuscarAltas = () => {

  const navigate = useNavigate()

  const [searchType, setSearchType] = useState('')
  const [filters, setFilters] = useState({})
  const [hasSearched, setHasSearched] = useState(false)

  const [searchAltas, { data, isLoading }] = useLazySearchAltasQuery()

  const handleTypeChange = (e) => {
    setSearchType(e.target.value)
    setFilters({})
    setHasSearched(false)
  }

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const handleSearch = () => {
    searchAltas(filters)
    setHasSearched(true)
  }

  const handleClear = () => {
    setSearchType('')
    setFilters({})
    setHasSearched(false)
  }

  return (
    <Box>

      <Typography variant="h5" mb={3}>
        Búsqueda de Altas
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>

        {/* SELECT TIPO BUSQUEDA */}
        <TextField
          select
          label="Buscar por"
          fullWidth
          value={searchType}
          onChange={handleTypeChange}
          sx={{ mb: 3 }}
        >
          <MenuItem value="propietario">Propietario</MenuItem>
          <MenuItem value="expediente">Expediente</MenuItem>
          <MenuItem value="ficha">N° de ficha</MenuItem>
          <MenuItem value="ubicacion">Ubicación</MenuItem>
          <MenuItem value="padron">Padrón</MenuItem>
          <MenuItem value="destino">Destino</MenuItem>
          <MenuItem value="plano">Tipo de plano</MenuItem>
        </TextField>

        {/* 1️⃣ PROPIETARIO */}
        {searchType === 'propietario' && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Nombre" name="nombre" fullWidth onChange={handleChange}/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Apellido" name="apellido" fullWidth onChange={handleChange}/>
            </Grid>
          </Grid>
        )}

        {/* 2️⃣ EXPEDIENTE */}
        {searchType === 'expediente' && (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField label="Número" name="exp_num" fullWidth onChange={handleChange}/>
            </Grid>
            <Grid item xs={2}>
              <TextField value="-" disabled fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Letra" name="exp_letra" fullWidth onChange={handleChange}/>
            </Grid>
          </Grid>
        )}

        {/* 3️⃣ FICHA */}
        {searchType === 'ficha' && (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField label="Número" name="ficha_num" fullWidth onChange={handleChange}/>
            </Grid>
            <Grid item xs={2}>
              <TextField value="-" disabled fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Letra" name="ficha_letra" fullWidth onChange={handleChange}/>
            </Grid>
          </Grid>
        )}

        {/* 4️⃣ UBICACION */}
        {searchType === 'ubicacion' && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Calle" name="calle" fullWidth onChange={handleChange}/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Barrio" name="barrio" fullWidth onChange={handleChange}/>
            </Grid>
          </Grid>
        )}

        {/* 5️⃣ PADRON */}
        {searchType === 'padron' && (
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField label="Distrito" name="distrito" fullWidth onChange={handleChange}/>
            </Grid>
            <Grid item xs={3}>
              <TextField label="Zona" name="zona" fullWidth onChange={handleChange}/>
            </Grid>
            <Grid item xs={3}>
              <TextField label="Manzana" name="manzana" fullWidth onChange={handleChange}/>
            </Grid>
            <Grid item xs={3}>
              <TextField label="Parcela" name="parcela" fullWidth onChange={handleChange}/>
            </Grid>
          </Grid>
        )}

        {/* 6️⃣ DESTINO */}
        {searchType === 'destino' && (
          <TextField label="Destino" name="tipo_destino" fullWidth onChange={handleChange}/>
        )}

        {/* 7️⃣ TIPO PLANO */}
        {searchType === 'plano' && (
          <TextField label="Tipo de plano" name="tipo_plano" fullWidth onChange={handleChange}/>
        )}

        {/* BOTONES */}
        {searchType && (
          <Box mt={3} display="flex" gap={2}>
            <Button variant="contained" onClick={handleSearch}>
              Buscar
            </Button>

            <Button variant="outlined" onClick={handleClear}>
              Limpiar filtro
            </Button>
          </Box>
        )}

      </Paper>

      {/* LOADING */}
      {isLoading && <CircularProgress />}

      {/* RESULTADOS */}
      {hasSearched && (
        <Grid container spacing={2}>
          {data?.map((alta) => (
            <Grid item xs={12} key={alta.id_Altas}>
              <Card>
                <CardActionArea onClick={() => navigate(`/altas/${alta.id_Altas}`)}>
                  <CardContent>

                    <Typography>
                      Destino: {alta.entityDestino?.tipo_de_destino}
                    </Typography>

                    <Typography>
                      Tipo plano: {alta.entityPlano?.tipo_plano}
                    </Typography>

                    <Typography>
                      Propietario: {alta.entityPropietario?.nombre} {alta.entityPropietario?.apellido}
                    </Typography>

                    <Typography>
                      Ubicación: {alta.calle} - {alta.barrio}
                    </Typography>

                    <Typography>
                      Fecha aprobación: {alta.fecha_de_aprob}
                    </Typography>

                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

    </Box>
  )
}

export default BuscarAltas
