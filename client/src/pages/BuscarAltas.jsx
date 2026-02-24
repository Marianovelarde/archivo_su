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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import { 
  useLazySearchAltasQuery,
 useGetDestinosQuery,
  useGetPlanosQuery } from '../store/api/altasApi'
import { useNavigate } from 'react-router-dom'

const BuscarAltas = () => {

  const navigate = useNavigate()

  const [searchType, setSearchType] = useState('')
  const [filters, setFilters] = useState({})
  const [hasSearched, setHasSearched] = useState(false)

 const [searchAltas, { isLoading }] = useLazySearchAltasQuery()
const { data: destinos = [] } = useGetDestinosQuery()
console.log(destinos);

const { data: planos = [] } = useGetPlanosQuery()
const [openModal, setOpenModal] = useState(false)
const [modalMessage, setModalMessage] = useState('')
const [results, setResults] = useState([])

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

const handleSearch = async () => {

  if (searchType === 'expediente') {
    if (!filters.exp_num || !filters.exp_letra) {
      setModalMessage('Debe completar número y letra del expediente.')
      setOpenModal(true)
      return
    }
  }

  try {
    const response = await searchAltas(filters).unwrap()
    setResults(response)
    setHasSearched(true)
  } catch (error) {
    setResults([])
    setHasSearched(true)
    setModalMessage(
      error?.data?.message ||
      'No existe alta registrada con la información brindada.'
    )
    setOpenModal(true)
  }
}
const handleClear = () => {
  setFilters({})
  setResults([])
  setOpenModal(false)
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
          <MenuItem value="expediente">N° de Expediente</MenuItem>
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
              <TextField label="Nombre" name="nombre" value={filters.nombre || ''} fullWidth onChange={handleChange}/>
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
              <TextField label="Número" name="exp_num" fullWidth value={filters.exp_num || ''} onChange={handleChange}/>
            </Grid>
            <Grid item xs={2}>
              <TextField value="-" disabled fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Letra" name="exp_letra" fullWidth value={filters.exp_letra || ''} onChange={handleChange}/>
            </Grid>
          </Grid>
        )}

        {/* 3️⃣ FICHA */}
        {searchType === 'ficha' && (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField label="Número" name="ficha_num" fullWidth value={filters.ficha_num || ''} onChange={handleChange}/>
            </Grid>
            <Grid item xs={2}>
              <TextField value="-" disabled fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Letra" name="ficha_letra" fullWidth value={filters.ficha_letra || ''} onChange={handleChange}/>
            </Grid>
          </Grid>
        )}

        {/* 4️⃣ UBICACION */}
        {searchType === 'ubicacion' && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Calle" name="calle" fullWidth value={filters.calle || ''} onChange={handleChange}/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Barrio" name="barrio" fullWidth value={filters.barrio || ''} onChange={handleChange}/>
            </Grid>
          </Grid>
        )}

        {/* 5️⃣ PADRON */}
        {searchType === 'padron' && (
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField label="Distrito" name="distrito" fullWidth value={filters.distrito || ''} onChange={handleChange}/>
            </Grid>
            <Grid item xs={3}>
              <TextField label="Zona" name="zona" fullWidth value={filters.zona || ''} onChange={handleChange}/>
            </Grid>
            <Grid item xs={3}>
              <TextField label="Manzana" name="manzana" fullWidth value={filters.manzana || ''} onChange={handleChange}/>
            </Grid>
            <Grid item xs={3}>
              <TextField label="Parcela" name="parcela" fullWidth value={filters.parcela || ''} onChange={handleChange}/>
            </Grid>
          </Grid>
        )}

        {/* 6️⃣ DESTINO */}
        {searchType === 'destino' && (
 <TextField
  select
  label="Destino"
  name="tipo_destino"
  fullWidth
  value={filters.tipo_destino || ''}
  onChange={handleChange}
>
  {destinos.get_destino.map((destino) => (
<MenuItem
  key={destino.id_destino}
  value={destino.tipo_de_destino}
>
  {destino.tipo_de_destino}
</MenuItem>
  ))}
</TextField>
        )}

        {/* 7️⃣ TIPO PLANO */}
        {searchType === 'plano' && (
  <TextField
    select
    label="Tipo de plano"
    name="tipo_plano"   // 👈 IMPORTANTE
    fullWidth
    value={filters.tipo_plano || ''}
    onChange={handleChange}
  >
    {planos.get_all_planos.map((plano) => (
      <MenuItem
        key={plano.id_plano}
        value={plano.tipo_plano}   // 👈 TEXTO, NO ID
      >
        {plano.tipo_plano}
      </MenuItem>
    ))}
  </TextField>
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
         {results.length > 0 && (
  <Grid container spacing={2}>
    {results.map((alta) => (
      <Grid item xs={12} key={alta.id_Altas}>
        <Card>
          <CardActionArea
            onClick={() => navigate(`/altas/${alta.id_Altas}`)}
          >
            <CardContent>

              <Typography sx={{fontWeight: "bold", fontSize: "1.5rem"}}>
                Propietario: {alta.entityPropietario?.nombre} {alta.entityPropietario?.apellido}
              </Typography>
              <Typography>
                Destino: {alta.entityDestino?.tipo_de_destino}
              </Typography>

              <Typography>
                Tipo plano: {alta.entityPlano?.tipo_plano}
              </Typography>


              <Typography>
                Ubicación: {alta.calle} - {alta.barrio}
              </Typography>

              <Typography sx={{fontWeight: "bold"}}>
                Fecha aprobación: {alta.fecha_de_aprob}
              </Typography>

            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ))}
  </Grid>
)}
        </Grid>
      )}
<Dialog
  open={openModal}
  onClose={() => setOpenModal(false)}
>
  <DialogTitle>Aviso</DialogTitle>

  <DialogContent>
    <DialogContentText>
      {modalMessage}
    </DialogContentText>
  </DialogContent>

  <DialogActions>
    <Button
      onClick={() => setOpenModal(false)}
      variant="contained"
    >
      Aceptar
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  )
}

export default BuscarAltas
