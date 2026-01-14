import {
  Autocomplete,
  TextField,
  Box,
  Button,
  CircularProgress,
} from '@mui/material'
import { useState } from 'react'
import { useGetPropietariosQuery } from '../../store/api/propietariosApi'
import CreatePropietarioModal from './CreatePropietarioModal'

const SelectPropietario = ({ value, onChange }) => {
  const { data = [], isLoading } = useGetPropietariosQuery()
  const [openModal, setOpenModal] = useState(false)

  const options = data?.get_propietarios ?? []

  return (
    <Box>
      <Autocomplete
      options={options}
      value={value || null}
      getOptionLabel={(option) =>
        `${option.nombre} ${option.apellido}`
      }
      isOptionEqualToValue={(option, value) =>
        option.id_propietario === value.id_propietario
      }
      onChange={(_, newValue) => onChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Propietario"
          size="small"
        />
        )}
      />

      <Button
        size="small"
        sx={{ mt: 1 }}
        onClick={() => setOpenModal(true)}
      >
        + Crear propietario
      </Button>

      <CreatePropietarioModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  )
}

export default SelectPropietario
