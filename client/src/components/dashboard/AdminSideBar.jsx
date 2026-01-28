




const AdminSidebar = ({ activeSection, setActiveSection }) => {
  return (
    <aside style={styles.sidebar}>
      <h3 style={styles.title}>Panel Admin</h3>

      <button
        style={
          activeSection === 'users'
            ? styles.buttonActive
            : styles.button
        }
        onClick={() => setActiveSection('users')}
      >
        Gestionar usuarios
      </button>
    </aside>
  )
}

const styles = {
  sidebar: {
    width: '240px',
    backgroundColor: '#1f2933',
    color: '#fff',
    padding: '20px',
  },
  title: {
    marginBottom: '24px',
    fontSize: '18px',
    fontWeight: '600',
  },
  button: {
    width: '100%',
    padding: '10px',
    background: 'transparent',
    color: '#d1d5db',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
  },
  buttonActive: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#374151',
    color: '#fff',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
  },
}

export default AdminSidebar
