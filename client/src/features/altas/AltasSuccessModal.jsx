import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useNavigate } from 'react-router-dom'

const AltaSuccessModal = ({ open, onClose, altaId }) => {
  const navigate = useNavigate()

  const handleGoDetalle = () => {
    navigate(`/altas/${altaId}`)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CheckCircleOutlineIcon color="success" />
        Alta creada
      </DialogTitle>

      <DialogContent>
        <Typography>
          La alta fue creada exitosamente.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Crear otra
        </Button>

        <Button
          variant="contained"
          onClick={handleGoDetalle}
          disabled={!altaId}
        >
          Ver detalle
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AltaSuccessModal
