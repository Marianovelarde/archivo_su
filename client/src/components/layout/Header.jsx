import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/api/authSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        {/* TÍTULOS */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">
            Municipalidad de Santiago del Estero
          </Typography>
          <Typography variant="caption">
            Dirección de Suelo Urbano – Archivo Técnico
          </Typography>
        </Box>

        {/* MENÚ USUARIO */}
        {isAuthenticated && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="body2">
              {user?.usuario}
            </Typography>

            <Button
              color="inherit"
              size="small"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
