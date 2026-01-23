import { Breadcrumbs, Typography, Link, Box } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useLocation, useNavigate } from 'react-router-dom'

const routeMap = {
  '': 'Inicio',
  altas: 'Altas',
  nueva: 'Nueva',
}

const AppBreadcrumbs = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const pathnames = location.pathname
    .split('/')
    .filter(Boolean)

  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {/* HOME */}
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Inicio
        </Link>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1
          const to = '/' + pathnames.slice(0, index + 1).join('/')

          const label =
            routeMap[value] ||
            (value.match(/^\d+$/)
              ? 'Detalle'
              : value)

          return last ? (
            <Typography
              key={to}
              color="text.primary"
              fontWeight={600}
            >
              {label}
            </Typography>
          ) : (
            <Link
              key={to}
              underline="hover"
              color="inherit"
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(to)}
            >
              {label}
            </Link>
          )
        })}
      </Breadcrumbs>
    </Box>
  )
}

export default AppBreadcrumbs
