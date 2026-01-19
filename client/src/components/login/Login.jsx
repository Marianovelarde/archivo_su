import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Avatar,
} from '@mui/material'

import { useState } from 'react'
import { useLoginMutation } from '../../store/api/authApi'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../store/api/authSlice'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/munilogo.png'

const Login = () => {
  const [form, setForm] = useState({ usuario: '', contraseña: '' })
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const res = await login(form).unwrap()

   dispatch(setCredentials({ user: res.user }))


    navigate('/')
  } catch (error) {
    alert('Credenciales incorrectas')
  }
}


  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 380,
          borderRadius: 2,
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* LOGO */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Avatar
              src={Logo}
              alt="Municipalidad de Santiago del Estero"
              sx={{
                width: 90,
                height: 90,
                bgcolor: 'background.paper',
                border: '3px solid',
                borderColor: 'primary.main',
              }}
            />
          </Box>

          {/* TÍTULOS */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" align="center">
              Municipalidad de Santiago del Estero
            </Typography>
            <Typography
              variant="caption"
              align="center"
              display="block"
              color="text.secondary"
            >
              Dirección de Suelo Urbano
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="subtitle1" align="center" gutterBottom>
            Acceso al sistema
          </Typography>

          {/* FORM */}
          <TextField
            label="Usuario"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />

          <TextField
            label="Contraseña"
            type="password"
            name="contraseña"
            value={form.contraseña}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              py: 1,
              fontWeight: 600,
            }}
          >
            Ingresar
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default Login
