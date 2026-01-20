import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/api/authSlice'
import { useNavigate } from 'react-router-dom'

const SessionExpiredModal = ({ open }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Dialog open={open}>
      <DialogTitle sx={{textAlign: 'center'}}>Sesión expirada</DialogTitle>

      <DialogContent>
        <Typography>
          Tu sesión se cerró por inactividad.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handleClose} sx={{alignItems: 'center', textAlign: 'center', right: '35px', bottom: '10px'}}>
          Volver a iniciar sesión
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SessionExpiredModal
