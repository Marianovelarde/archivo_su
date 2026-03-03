import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Avatar,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/api/authSlice'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isAuthenticated } = useSelector((state) => state.auth)
console.log(isAuthenticated);

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        {/* IZQUIERDA – TÍTULOS */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
            Municipalidad de Santiago del Estero
          </Typography>
          <Typography variant="caption">
            Dirección de Suelo Urbano – Archivo Técnico
          </Typography>
        </Box>

        {/* DERECHA – USUARIO */}
        {isAuthenticated && user && (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
           
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                size="small"
              >
                <Avatar
                  sx={{
                    bgcolor: 'secondary.main',
                    width: 40,
                    height: 40,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {user.usuario?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Box>

            {/* MENÚ */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: {
                  minWidth: 220,
                  mt: 1,
                },
              }}
            >
              {/* INFO USUARIO */}
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="h6" color="text.secondary">
                  Usuario activo
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600 }}
                >
                  {user.usuario}
                </Typography>

                {user.isAdmin && (
                  <Typography
                    variant="caption"
                    color="primary"
                  >
                    Administrador
                  </Typography>
                )}
              </Box>

              <Divider />

              {/* SOLO ADMIN */}
              {user.isAdmin && (
                <MenuItem
                  onClick={() => {
                    handleMenuClose()
                    navigate('/admin/panel')
                  }}
                >
                  Panel de admin
                </MenuItem>
              )}

              {/* TODOS */}
              <MenuItem
                onClick={() => {
                  handleMenuClose()
                  navigate('/cambiar-contraseña')
                }}
              >
                Cambiar contraseña
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={() => {
                  handleMenuClose()
                  handleLogout()
                }}
                sx={{ color: 'error.main' }}
              >
                Cerrar sesión
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
