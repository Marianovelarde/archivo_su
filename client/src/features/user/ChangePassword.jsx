import { useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useUpdatePasswordMutation } from '../../store/api/authApi'
import SuccessModal from '../../components/modal/SuccessModal'

const ChangePassword = () => {
  const user = useSelector((state) => state.auth.user)
const auth = useSelector((state) => state.auth)

const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [localError, setLocalError] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const [updatePassword, { isLoading, error }] =
    useUpdatePasswordMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError(null)

    if (!password || !confirm) {
      setLocalError('Debe completar ambos campos')
      return
    }

    if (password !== confirm) {
      setLocalError('Las contraseñas no coinciden')
      return
    }

    try {
      await updatePassword({
        id_user: user.id_user,
        contraseña: password,
      }).unwrap()

      setPassword('')
      setConfirm('')
      setOpenModal(true)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 6,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            width: '100%',
            maxWidth: 420,
            p: 3,
          }}
        >
            <Box sx={{ mt: 2 }}>
                    <Button
                      size="small"
                      startIcon={<ArrowBackIcon />}
                      onClick={() => navigate(-1)}
                    >
                      Volver
                    </Button>
                  </Box>  
          <Typography variant="h6" gutterBottom>
            Cambiar contraseña
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Usuario: <strong>{user.usuario}</strong>
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {localError && (
                <Alert severity="warning">{localError}</Alert>
              )}

              {error && (
                <Alert severity="error">
                  Error al cambiar la contraseña
                </Alert>
              )}

              <TextField
                label="Nueva contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />

              <TextField
                label="Confirmar contraseña"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                fullWidth
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
              >
                {isLoading
                  ? 'Actualizando...'
                  : 'Cambiar contraseña'}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>

      {/* MODAL ÉXITO */}
      <SuccessModal
        open={openModal}
        title="Contraseña actualizada"
        message="La contraseña fue modificada correctamente."
        onClose={() => setOpenModal(false)}
      />
    </>
  )
}

export default ChangePassword
