const UserRow = ({ user }) => {
  return (
    <tr>
      <td>{user.nombre}</td>
      <td>{user.rol}</td>
      <td>{user.activo ? 'Activo' : 'Inactivo'}</td>
      <td style={{ display: 'flex', gap: '8px' }}>
        <button>Rol</button>
        <button>Clave</button>
        <button>
          {user.activo ? 'Desactivar' : 'Activar'}
        </button>
      </td>
    </tr>
  )
}

export default UserRow
