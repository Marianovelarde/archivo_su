import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import Store from '../../store/store';
import CardMedia from '@mui/material/CardMedia'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import logoMuni from '../../assets/munilogo.png'

const Nav = () => {
  const { user, logout } = Store()// Función de logout
  
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    logout(false)
  };

  return (
    <React.Fragment>
      <Box
        component="nav"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: '#18278C',
          color: 'white',
          width: '1370px',
          height: '90px',
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          // p: 2,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '5px'
        }}
      >
      <Card sx={{height: '50px', width: '50px', marginLeft: '10px'}}>
        <CardMedia component='img'
        src={logoMuni}
        alt='logo muni'/>
      </Card>
        <Typography variant="h7" sx={{marginRight: '670px', fontFamily: 'inter', letterSpacing: '1px', fontSize: '20px' }}>
          Sistema de Registro de planos aprobados
         
        <Typography variant='p' sx={{fontSize: '10px',  display: 'flex', }}>Dirección de Suelo Urbano - Municipalidad de la Capital</Typography>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <nav>
            <Typography variant='p'>usuario: {user.user.usuario}  </Typography>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                alignItems: 'right',
                gap: '1.5rem',
                padding: '0px',
                margin: 0,
                marginTop: '30px',
              
              }}
            >
              <li>
                <Link to='/registro' style={{ textDecoration: 'none', color: 'white' }}>
                  Altas
                </Link>
              </li>
              <li>
                <Link to='#' style={{ textDecoration: 'none', color: 'white' }}>
                  Consultas
                </Link>
              </li>
              {/* <li>
                <Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>
                  Crear Usuario
                </Link>
              </li> */}
            </ul>
          </nav>

          <Tooltip title="Configuración de cuenta">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2, marginTop: '50px', padding: '10px' }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Perfil
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> Mi cuenta
        </MenuItem>
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Agregar cuenta
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configuración
        </MenuItem> */}
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default Nav;
