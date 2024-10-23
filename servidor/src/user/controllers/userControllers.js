const {createUserServices, getUserServices, getUserByNameServices} = require('../services/UserService')

const createUserControllers =  async (req,res) => {

    const {usuario, contraseña} = req.body
    console.log(req.body)
    console.log('usuario: ', usuario, 'contraseña: ', contraseña);
    
      if (!usuario || !contraseña) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    const createUser = await createUserServices(usuario, contraseña)
    try {
        if(createUser) return res.status(201).json({message: 'Usuario creado con exito', createUser})
    } catch (error) {
        return res.status(500).json({message: 'Error al crear un usuario'})
    }
}

const getUSerControllers = async (req,res) => {

    const getUser = await getUserServices()
    if(!getUser.length) {
        return   res.status(500).json({message: 'No hay usuarios registrados'})
    }
    return res.status(200).json(getUser)
    
};

const loginControllers = async (req, res) => {
    try {
        const {usuario, contraseña} = req.body
        const user = await getUserByNameServices(usuario, contraseña)
        res.status(200).json({message: 'Login exitoso', user})
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

module.exports = {
    createUserControllers,
    getUSerControllers,
    loginControllers
}