import {
  Autocomplete,
  TextField,
  Box,
  Button,
  CircularProgress,
} from '@mui/material'
import { useState } from 'react'
import { useGetPlanosQuery } from '../../store/api/planoApi'
import CreatePlanoModal from './CreatePlanoModal'

const SelectPlano = ({ value, onChange }) => {
  const { data = [], isLoading } = useGetPlanosQuery()
  const [open, setOpen] = useState(false)
  
   const options = data?.get_all_planos?? []

  return (
    <Box>
      <Autocomplete
        options={options}
        loading={isLoading}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        getOptionLabel={(p) => p?.tipo_plano ?? ''}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tipo de plano"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading && <CircularProgress size={18} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <Button size="small" sx={{ mt: 1 }} onClick={() => setOpen(true)}>
        + Crear tipo de plano
      </Button>

      <CreatePlanoModal open={open} onClose={() => setOpen(false)} />
    </Box>
  )
}

export default SelectPlano
