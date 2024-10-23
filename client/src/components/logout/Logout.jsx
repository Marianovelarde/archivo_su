import { Navigate } from "react-router-dom"
import Store from "../../store/store"

const Logout = () => {

    const logout = Store((state) => state.logout)

    const handleLogout = () => {
        logout()
    }

  return (
    <div>
      <button onClick={handleLogout}>Cerrar sesion</button>
      <Navigate to='/'/>
    </div>
  )
}

export default Logout
