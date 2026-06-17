import Layout from "../layout/Layout"
import { useState } from "react";
// import { Navigate } from "react-router-dom";
import Store from '../../store/store'
const SignUp = () => {

  const [usuario, setUsuario] = useState("");

  const [contraseña, setcontraseña] = useState("")
  

  const { createUser, error} = Store()
  // const auth = useAuth()

const handleSubmit =  (e) => {
  e.preventDefault()
   createUser(usuario, contraseña)
   

  alert('Usuario creado con éxito')
}

  // if(isAuthenticated) {
  //   return <Navigate to='/dashboard'/>
  // }
  return ( 
  <div>

    <Layout>
      <form onSubmit={handleSubmit}>
        <h1>login</h1>
    <label>Username</label>
      <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>

      <label>contraseña</label>
      <input type="contraseña" value={contraseña} onChange={(e) => setcontraseña(e.target.value)} />
      <button type="submit">Create User</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
    </Layout>    
  </div>
  )
}

export default SignUp
