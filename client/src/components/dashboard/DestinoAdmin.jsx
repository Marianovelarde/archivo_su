import { DataGrid } from '@mui/x-data-grid'
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material'

import { useState } from 'react'

import {
  useGetDestinosQuery,
  useEditDestinoMutation,
} from '../../store/api/destinoApi'

const DestinoAdmin = () => {

  const { data, isLoading } = useGetDestinosQuery()
  const [editDestino] = useEditDestinoMutation()

  const [open, setOpen] = useState(false)
  const [selectedDestino, setSelectedDestino] = useState(null)
  const [value, setValue] = useState('')

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  if (isLoading) return <div>Cargando...</div>

  const rows = data?.get_destino ?? []

  const handleOpenEdit = (destino) => {
    setSelectedDestino(destino)
    setValue(destino.tipo_de_destino)
    setOpen(true)
  }

  const handleSave = async () => {
    try {

      await editDestino({
        id: selectedDestino.id_destino,
        body: { tipo_de_destino: value },
      }).unwrap()

      showSnackbar('Destino actualizado correctamente')

      setOpen(false)
      setSelectedDestino(null)

    } catch (err) {

      showSnackbar('Error al actualizar destino', 'error')

    }
  }

  const columns = [
    {
      field: 'tipo_de_destino',
      headerName: 'Destino',
      flex: 1,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleOpenEdit(params.row)}
        >
          Editar
        </Button>
      ),
    },
  ]

  return (
    <Box sx={{ width: '100%' }}>

      <Typography variant="h6" gutterBottom>
        Gestión de destinos
      </Typography>

      <DataGrid
        rows={rows}
        getRowId={(row) => row.id_destino}
        columns={columns}
        autoHeight
        pageSizeOptions={[10, 20, 50]}
        disableRowSelectionOnClick
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#e3edf7',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f1f7fd',
          },
        }}
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Editar destino</DialogTitle>

        <DialogContent>

          <TextField
            label="Tipo de destino"
            fullWidth
            sx={{ mt: 1 }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={() => setOpen(false)}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!value}
          >
            Guardar
          </Button>

        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({ ...snackbar, open: false })
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  )
}

export default DestinoAdmin