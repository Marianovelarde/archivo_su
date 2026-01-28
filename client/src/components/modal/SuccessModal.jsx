import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const SuccessModal = ({
  open,
  title = 'Operación exitosa',
  message,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <CheckCircleOutlineIcon color="success" />
        {title}
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2">
          {message}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SuccessModal
