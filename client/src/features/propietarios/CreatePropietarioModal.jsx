import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from '@mui/material'
import { useCreatePropietarioMutation } from '../../store/api/propietariosApi'
import { useState } from 'react'

const CreatePropietarioModal = ({ open, onClose, onCreated }) => {

  const [createPropietario, { isLoading }] =
    useCreatePropietarioMutation()

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    cuil: '',
    domicilio_postal: '',
    email: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    await createPropietario(form)
    onClose()
    setForm({ nombre: '', apellido: '', cuil: '', domicilio_postal: '', email: '' })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nuevo Propietario</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="CUIL"
            name="cuil"
            value={form.cuil}
            onChange={handleChange}
            fullWidth
          />
           <TextField
            label="DOMICILIO POSTAL"
            name="domicilio_postal"
            value={form.domicilio_postal}
            onChange={handleChange}
            fullWidth
          />
 <TextField
            label="EMAIL"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Guardar
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePropietarioModal
