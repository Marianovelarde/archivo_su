import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const AltaErrorModal = ({ open, onClose, missingFields }) => {
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ErrorOutlineIcon color="error" />
        Faltan campos obligatorios
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          Debe completar los siguientes campos:
        </Typography>

        <List dense>
          {missingFields.map((field, index) => (
            <ListItem key={index} sx={{ py: 0 }}>
              <ListItemText primary={`• ${field}`} />
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AltaErrorModal