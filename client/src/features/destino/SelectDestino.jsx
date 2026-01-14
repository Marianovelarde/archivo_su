import {
  Autocomplete,
  TextField,
  Box,
  Button,
  CircularProgress,
} from '@mui/material'
import { useState } from 'react'
import { useGetDestinosQuery } from '../../store/api/destinoApi'
import CreateDestinoModal from './CreateDestinoModal'

const SelectDestino = ({ value, onChange }) => {
  const { data, isLoading } = useGetDestinosQuery()
  const [open, setOpen] = useState(false)

  const options = data?.get_destino ?? []

  return (
    <Box>
      <Autocomplete
        options={options}
        loading={isLoading}
        value={value || null}
        getOptionLabel={(option) => option.tipo_de_destino}
        isOptionEqualToValue={(o, v) => o.id_destino === v.id_destino}
        onChange={(_, newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Destino" size="small" />
        )}
      />

      <Button size="small" sx={{ mt: 1 }} onClick={() => setOpen(true)}>
        + Crear destino
      </Button>

      <CreateDestinoModal open={open} onClose={() => setOpen(false)} />
    </Box>
  )
}


export default SelectDestino
