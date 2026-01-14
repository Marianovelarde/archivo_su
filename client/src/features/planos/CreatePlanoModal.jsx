import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from '@mui/material'
import { useCreatePlanoMutation } from '../../store/api/planoApi'
import { useState } from 'react'

const CreatePlanoModal = ({ open, onClose }) => {
  const [createPlano, { isLoading }] = useCreatePlanoMutation()
  const [tipo, setTipo] = useState('')

  const handleSubmit = async () => {
    if (!tipo.trim()) return
    await createPlano({ tipo_plano: tipo })
    setTipo('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nuevo tipo de plano</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Tipo de plano"
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

export default CreatePlanoModal
