import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

const AltaFichaDuplicadaModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningAmberIcon color="warning" />
        Ficha duplicada
      </DialogTitle>

      <DialogContent>
        <Typography>
          Ya existe un alta con ese número de ficha. 
          Por favor, ingrese una ficha diferente.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="warning" onClick={onClose}>
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AltaFichaDuplicadaModal