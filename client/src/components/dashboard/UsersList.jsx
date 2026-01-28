import { DataGrid } from '@mui/x-data-grid'
import { Box, Typography, Select, MenuItem, Switch,Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField } from '@mui/material'

  import { useState } from 'react'
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useToggleUserActiveMutation,
  useUpdatePasswordMutation
} from '../../store/api/authApi'

const UserList = () => {
  const { data, isLoading, error } = useGetUsersQuery()
  const [updateRole] = useUpdateUserRoleMutation()
  const [toggleActive] = useToggleUserActiveMutation()
  const [changePassword] = useUpdatePasswordMutation()


  const [open, setOpen] = useState(false)
const [selectedUser, setSelectedUser] = useState(null)
const [newPassword, setNewPassword] = useState('')


  if (isLoading) return <div>Cargando...</div>

console.log('USERS DATA:', data)
  const rows = data ?? []
const handleChangePassword = async () => {
  try {
    await changePassword({
      id_user: selectedUser.id_user,
      contraseña: newPassword,
    }).unwrap()

    alert('Contraseña cambiada con éxito ✅')

    setOpen(false)
    setNewPassword('')
    setSelectedUser(null)
  } catch (error) {
    console.error(error)
    alert('Error al cambiar la contraseña ❌')
  }
}
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Usuarios del sistema
      </Typography>

      <DataGrid
        rows={rows}
        getRowId={(row) => row.id_user}
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
columns={[
  {
    field: 'usuario',
    headerName: 'Usuario',
    flex: 1,
  },

  {
    field: 'isAdmin',
    headerName: 'Rol',
    width: 180,
    renderCell: (params) => (
      <Select
        size="small"
        value={params.value ? 'admin' : 'user'}
        onChange={(e) =>
          updateRole({
            id_user: params.row.id_user,
            isAdmin: e.target.value === 'admin',
          })
        }
      >
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="user">Usuario</MenuItem>
      </Select>
    ),
  },

  {
    field: 'isActived',
    headerName: 'Activo',
    width: 120,
    renderCell: (params) => (
      <Switch
        checked={Boolean(params.value)}
        onChange={(e) =>
          toggleActive({
            id_user: params.row.id_user,
            isActived: e.target.checked,
          })
        }
      />
    ),
  },
  {
  field: 'password',
  headerName: 'Contraseña',
  width: 180,
  sortable: false,
  renderCell: (params) => (
    <Button
      variant="outlined"
      size="small"
      onClick={() => {
        setSelectedUser(params.row)
        setOpen(true)
      }}
    >
      Cambiar
    </Button>
  ),
},
]}

      />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
  <DialogTitle>Cambiar contraseña</DialogTitle>

  <DialogContent>
    <Typography variant="body2" sx={{ mb: 2 }}>
      Usuario: <strong>{selectedUser?.usuario}</strong>
    </Typography>

    <TextField
      label="Nueva contraseña"
      type="password"
      fullWidth
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpen(false)}>Cancelar</Button>
    <Button
      variant="contained"
      onClick={handleChangePassword}
      disabled={!newPassword}
    >
      Guardar
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  )
}

export default UserList
