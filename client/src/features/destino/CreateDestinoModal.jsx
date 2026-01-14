import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from '@mui/material'
import { useCreateDestinoMutation } from '../../store/api/destinoApi'
import { useState } from 'react'

const CreateDestinoModal = ({ open, onClose }) => {
  const [createDestino, { isLoading }] = useCreateDestinoMutation()
  const [tipo, setTipo] = useState('')

  const handleSubmit = async () => {
    if (!tipo.trim()) return
    await createDestino({ tipo_de_destino: tipo })
    setTipo('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nuevo destino</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Tipo de destino"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
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

export default CreateDestinoModal
