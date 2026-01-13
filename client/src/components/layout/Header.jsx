import { AppBar, Toolbar, Typography, Box } from '@mui/material'

const Header = () => {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">
            Municipalidad de Santiago del Estero
          </Typography>
          <Typography variant="caption">
            Dirección de Suelo Urbano – Archivo Técnico
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
