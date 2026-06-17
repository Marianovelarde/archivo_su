import { DataGrid } from '@mui/x-data-grid'
import { Box, Typography, Select, MenuItem, Switch,Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField } from '@mui/material'
  import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
  import { useState } from 'react'
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useToggleUserActiveMutation,
  useUpdatePasswordMutation,
  useCreateUserMutation 
} from '../../store/api/authApi'


import { Snackbar, Alert } from '@mui/material'

const UserList = () => {



  const { data, isLoading, error } = useGetUsersQuery()
  const [updateRole] = useUpdateUserRoleMutation()
  const [toggleActive] = useToggleUserActiveMutation()
  const [changePassword] = useUpdatePasswordMutation()
  const [open, setOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const [loadingRoleId, setLoadingRoleId] = useState(null)
  const [loadingStatusId, setLoadingStatusId] = useState(null)
  const [changingPassword, setChangingPassword] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [createUser, { isLoading: creating }] = useCreateUserMutation()
const [confirmOpen, setConfirmOpen] = useState(false)
const [userToToggle, setUserToToggle] = useState(null)
const currentUser = useSelector(state => state.auth.user)

 

  const [snackbar, setSnackbar] = useState({
  open: false,
  message: '',
  severity: 'success',
})




const [form, setForm] = useState({
  usuario: '',
  contraseña: '',
  isAdmin: false,
  isActived: true,
  role: 'consulta'
})


const handleCreateUser = async () => {
  try {
    await createUser(form).unwrap()

    showSnackbar('Usuario creado con éxito', 'success')

    setCreateOpen(false)
    setForm({
      usuario: '',
      contraseña: '',
      isAdmin: false,
      isActived: true,
      role: 'consulta'
    })
  } catch (error) {
    showSnackbar(
      error?.data?.message || 'Error al crear usuario',
      'error'
    )
  }
}


const showSnackbar = (message, severity = 'success') => {
  setSnackbar({ open: true, message, severity })
}

if (isLoading) return <div>Cargando...</div>

  const rows = data ?? []


const handleChangePassword = async () => {
  try {
    setChangingPassword(true)

    await changePassword({
      id_user: selectedUser.id_user,
      contraseña: newPassword,
    }).unwrap()

    showSnackbar('Contraseña actualizada correctamente')
    setOpen(false)
    setNewPassword('')
    setSelectedUser(null)
  } catch (err) {
    showSnackbar('Error al cambiar la contraseña', 'error')
  } finally {
    setChangingPassword(false)
  }
}
const handleToggleUser = async (id_user, isActived) => {
  try {
    setLoadingStatusId(id_user)

    await toggleActive({ id_user, isActived }).unwrap()

    showSnackbar(
      isActived ? 'Usuario activado' : 'Usuario desactivado'
    )
  } catch (err) {
    showSnackbar('Error al actualizar estado', 'error')
  } finally {
    setLoadingStatusId(null)
  }


}

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Usuarios del sistema
      </Typography>
<Button
  variant="contained"
  sx={{ mb: 2 }}
  onClick={() => setCreateOpen(true)}
>
  Crear nuevo usuario
</Button>

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
  field: 'role',
  headerName: 'Rol',
  width: 200,
  renderCell: (params) => (
    <Select
      size="small"
      value={params.value}
      disabled={loadingRoleId === params.row.id_user}
      onChange={async (e) => {
        try {
          setLoadingRoleId(params.row.id_user)

          await updateRole({
            id_user: params.row.id_user,
            role: e.target.value,
          }).unwrap()

          showSnackbar('Rol actualizado correctamente')
        } catch (err) {
          showSnackbar('Error al cambiar el rol', 'error')
        } finally {
          setLoadingRoleId(null)
        }
      }}
    >
      <MenuItem value="super_admin">Super Admin</MenuItem>
      <MenuItem value="editor">Editor</MenuItem>
      <MenuItem value="visor">Visor</MenuItem>
      <MenuItem value="consulta">Consulta</MenuItem>
    </Select>
  ),
},

{
  field: 'isActived',
  headerName: 'Activo',
  width: 120,
  renderCell: (params) => {
    const isSelf = params.row.id_user === currentUser?.id_user

    return (
      <Switch
        checked={Boolean(params.value)}
        disabled={
          isSelf || loadingStatusId === params.row.id_user
        }
        onChange={(e) => {
          if (isSelf) {
            showSnackbar(
              'No podés desactivar tu propio usuario',
              'warning'
            )
            return
          }

          const newStatus = e.target.checked

          if (!newStatus) {
            setUserToToggle(params.row)
            setConfirmOpen(true)
            return
          }

          handleToggleUser(params.row.id_user, true)
        }}
      />
    )
  },
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
  disabled={!newPassword || changingPassword}
>
  {changingPassword ? 'Guardando...' : 'Guardar'}
</Button>
  </DialogActions>
</Dialog>
<Dialog
  open={confirmOpen}
  onClose={() => setConfirmOpen(false)}
>
  <DialogTitle>Confirmar desactivación</DialogTitle>

  <DialogContent>
    <Typography>
      ¿Seguro que deseas desactivar al usuario{' '}
      <strong>{userToToggle?.usuario}</strong>?
    </Typography>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setConfirmOpen(false)}>
      Cancelar
    </Button>

    <Button
      variant="contained"
      color="error"
      onClick={() => {
        handleToggleUser(userToToggle.id_user, false)
        setConfirmOpen(false)
        setUserToToggle(null)
      }}
    >
      Desactivar
    </Button>
  </DialogActions>
</Dialog>
<Dialog
  open={createOpen}
  onClose={() => setCreateOpen(false)}
  maxWidth="xs"
  fullWidth
>
  <DialogTitle>Crear nuevo usuario</DialogTitle>

  <DialogContent>
    <TextField
      label="Usuario"
      fullWidth
      sx={{ mb: 2 }}
      value={form.usuario}
      onChange={(e) =>
        setForm({ ...form, usuario: e.target.value })
      }
    />

    <TextField
      label="Contraseña"
      type="password"
      fullWidth
      sx={{ mb: 2 }}
      value={form.contraseña}
      onChange={(e) =>
        setForm({ ...form, contraseña: e.target.value })
      }
    />

 <Select
  fullWidth
  value={form.role}
  onChange={(e) =>
    setForm({
      ...form,
      role: e.target.value,
    })
  }
  sx={{ mb: 2 }}
>
  <MenuItem value="super_admin">Super Admin</MenuItem>
  <MenuItem value="editor">Editor</MenuItem>
  <MenuItem value="visor">Visor</MenuItem>
  <MenuItem value="consulta">Consulta</MenuItem>
</Select>

    <Box display="flex" alignItems="center" gap={1}>
      <Typography>Activo</Typography>
      <Switch
        checked={form.isActived}
        onChange={(e) =>
          setForm({
            ...form,
            isActived: e.target.checked,
          })
        }
      />
    </Box>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setCreateOpen(false)}>
      Cancelar
    </Button>

    <Button
      variant="contained"
      onClick={handleCreateUser}
      disabled={
        !form.usuario ||
        !form.contraseña ||
        creating
      }
    >
      {creating ? 'Creando...' : 'Crear'}
    </Button>
  </DialogActions>
</Dialog>
<Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={() => setSnackbar({ ...snackbar, open: false })}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
>
  <Alert
    onClose={() => setSnackbar({ ...snackbar, open: false })}
    severity={snackbar.severity}
    variant="filled"
  >
    {snackbar.message}
  </Alert>
</Snackbar>
    </Box>
  )
}

export default UserList
