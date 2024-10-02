import Layout from "../layout/Layout"

const Login = () => {
  return ( 
  <div>

    <Layout> 
    <form>
      <h1>Login</h1>
      <label>Username</label>
      <input type="text" />

      <label>Password</label>
      <input type="password" />
      <button>Login</button>
    </form>
    </Layout>
    
  </div>
  )
}

export default Login
