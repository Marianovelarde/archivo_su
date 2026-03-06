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
  Alert
} from '@mui/material'

import { useState } from 'react'

import {
  useGetPropietariosQuery,
  useEditPropietarioMutation
} from '../../store/api/propietariosApi'

const PropietariosAdmin = () => {

  const { data, isLoading } = useGetPropietariosQuery()
  const [editPropietario] = useEditPropietarioMutation()

  const [open, setOpen] = useState(false)
  const [selectedPropietario, setSelectedPropietario] = useState(null)
 const [form, setForm] = useState({
  nombre: '',
  apellido: '',
  domicilio_postal: '',
  cuil: '',
  email: ''
})

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  if (isLoading) return <div>Cargando...</div>

const rows = data?.get_propietarios ?? []
console.log(rows);


const handleOpenEdit = (prop) => {

  setSelectedPropietario(prop)

  setForm({
    nombre: prop.nombre || '',
    apellido: prop.apellido || '',
    domicilio_postal: prop.domicilio_postal || '',
    cuil: prop.cuil || '',
    email: prop.email || ''
  })

  setOpen(true)
}
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  })
}
  const handleSave = async () => {

  try {

    await editPropietario({
      id: selectedPropietario.id_propietario,
      body: form
    }).unwrap()

    showSnackbar('Propietario actualizado correctamente')

    setOpen(false)
    setSelectedPropietario(null)

  } catch (error) {

    showSnackbar('Error al actualizar propietario', 'error')

  }
}
const columns = [
  {
    field: 'nombre',
    headerName: 'Nombre',
    flex: 1,
  },
  {
    field: 'apellido',
    headerName: 'Apellido',
    flex: 1,
  },
  {
    field: 'cuil',
    headerName: 'CUIL',
    width: 200,
  },
   {
    field: 'domicilio_postal',
    headerName: 'Domicilio Postal',
    width: 200,
  },
    {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'acciones',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <Button
        size="small"
        onClick={() => handleOpenEdit(params.row)}
      >
        Editar
      </Button>
    )
  }
]
  return (

    <Box sx={{ width: '100%' }}>

      <Typography variant="h6" gutterBottom>
        Gestión de propietarios
      </Typography>

      <DataGrid
        rows={rows}
        getRowId={(row) => row.id_propietario}
        columns={columns}
        autoHeight
        pageSizeOptions={[10,20,50]}
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

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>

        <DialogTitle>Editar propietario</DialogTitle>

        <DialogContent>

  <TextField
    label="Nombre"
    name="nombre"
    fullWidth
    sx={{ mt: 1 }}
    value={form.nombre}
    onChange={handleChange}
  />

  <TextField
    label="Apellido"
    name="apellido"
    fullWidth
    sx={{ mt: 2 }}
    value={form.apellido}
    onChange={handleChange}
  />

  <TextField
    label="Domicilio postal"
    name="domicilio_postal"
    fullWidth
    sx={{ mt: 2 }}
    value={form.domicilio_postal}
    onChange={handleChange}
  />

  <TextField
    label="CUIL"
    name="cuil"
    fullWidth
    sx={{ mt: 2 }}
    value={form.cuil}
    onChange={handleChange}
  />

  <TextField
    label="Email"
    name="email"
    fullWidth
    sx={{ mt: 2 }}
    value={form.email}
    onChange={handleChange}
  />

</DialogContent>


        <DialogActions>

          <Button onClick={() => setOpen(false)}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!form}
          >
            Guardar
          </Button>

        </DialogActions>

      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({ ...snackbar, open:false })
        }
        anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
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

export default PropietariosAdmin