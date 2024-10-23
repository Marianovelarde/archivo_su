// import { useAuth } from "../auth/authProvider";
import Layout from "../layout/Layout"
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Store from '../../store/store'
const Login = () => {

  const [usuario, setUsuario] = useState("");

  const [contraseña, setcontraseña] = useState("")
  
  const navigate = useNavigate()

  const {isAuthenticated, login, error} = Store()
  // const auth = useAuth()

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

const handleSubmit = async  (e) => {
  e.preventDefault()
  await login(usuario, contraseña)
navigate('/')
}

  return ( 
  <div>

    <Layout>
      <form onSubmit={handleSubmit}>
        <h3>Ingresar al sistema</h3>
    <label>Username</label>
      <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>

      <label>contraseña</label>
      <input type="contraseña" value={contraseña} onChange={(e) => setcontraseña(e.target.value)} />
      <button type="submit">Ingresar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
    </Layout>    
  </div>
  )
}

export default Login
