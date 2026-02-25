import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'
import { useLocation } from 'react-router-dom'

const MetricsDetail = () => {

  const { state } = useLocation()

  console.log('STATE:', state)

  if (!state || state.length === 0) {
    return (
      <Typography>No hay datos disponibles</Typography>
    )
  }

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Detalle
      </Typography>

      <List>
        {state.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={
                `${item.barrio || item.apellido}: ${item.cantidad}`
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default MetricsDetail