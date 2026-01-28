import { useLoginMutation, useUpdatePasswordMutation } from '../../store/api/authApi'
import { useState } from 'react'

export default function AdminPanel() {
  const { data: users = [], isLoading } = useLoginMutation()
  const [updatePassword] = useUpdatePasswordMutation()

  const [selectedUser, setSelectedUser] = useState(null)
  const [newPassword, setNewPassword] = useState('')

  if (isLoading) return <p>Cargando usuarios...</p>

  const handleChangePassword = async () => {
    if (!selectedUser || !newPassword) return

    await updatePassword({
      userId: selectedUser.id,
      password: newPassword,
    })

    setNewPassword('')
    alert('Contraseña actualizada')
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Panel Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-lg font-medium">Usuarios</h2>

          {users.map((user) => (
            <div
              key={user.id}
              className={`p-3 border rounded cursor-pointer ${
                selectedUser?.id === user.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <p><strong>{user.name}</strong></p>
              <p className="text-sm">Rol: {user.role}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-medium">Acciones</h2>

          {selectedUser ? (
            <>
              <p>
                Usuario seleccionado: <strong>{selectedUser.name}</strong>
              </p>

              <input
                type="password"
                placeholder="Nueva contraseña"
                className="border p-2 w-full rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button
                onClick={handleChangePassword}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Cambiar contraseña
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              Seleccioná un usuario para gestionar
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
