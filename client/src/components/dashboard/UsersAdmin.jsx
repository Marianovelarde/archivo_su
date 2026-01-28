import UserRow from './UserRow'

const UsersAdmin = () => {
  const users = [
    { id: 1, nombre: 'Mariano', rol: 'admin', activo: true },
    { id: 2, nombre: 'Erika Costanzo', rol: 'user', activo: false },
  ]

  return (
    <div>
      <h2>Gestión de usuarios</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const styles = {
  table: {
    width: '100%',
    marginTop: '16px',
    borderCollapse: 'collapse',
  },
}

export default UsersAdmin
