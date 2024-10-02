import Layout from "../layout/Layout"

const SignUp = () => {
  return ( 
  <div>

    <Layout> 
    <form>
      <h1>Signup</h1>
      <label>Username</label>
      <input type="text" />

      <label>Name</label>
      <input type="text" />

      <label>Password</label>
      <input type="password" />
      <button>Create User</button>
    </form>
    </Layout>
    
  </div>
  )
}

export default SignUp
