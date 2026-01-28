const jwt = require('jsonwebtoken')
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../config/jwt')

const {createUserServices,
     getUserServices, 
     getUserByNameServices, 
     updateUserServices
    } = require('../services/UserService')

const createUserControllers =  async (req,res) => {

    const {usuario, contraseña, isAdmin} = req.body
    console.log(req.body)
    console.log('usuario: ', usuario, 'contraseña: ', contraseña);
    
      if (!usuario || !contraseña) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    const createUser = await createUserServices(usuario, contraseña, isAdmin)
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
    const { usuario, contraseña } = req.body

    // 1️⃣ Buscar usuario + validar contraseña
    const user = await getUserByNameServices(usuario, contraseña)

    if (!user) {
      return res.status(401).json({
        message: 'Credenciales incorrectas',
      })
    }

    // 2️⃣ Verificar si está activo
    if (!user.isActived) {
      return res.status(403).json({
        message: 'Usuario desactivado',
      })
    }

    // 3️⃣ Generar token SOLO si está todo OK
    const token = jwt.sign(
      {
        id_user: user.id_user,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    // 4️⃣ Respuesta
    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id_user: user.id_user,
        usuario: user.usuario,
        isAdmin: user.isAdmin,
        isActived: user.isActived,
      },
    })
  } catch (error) {
    console.error('[LOGIN ERROR]', error)
    res.status(500).json({
      message: 'Error interno del servidor',
    })
  }
}


const updateUserControllers = async (req, res) => {
  try {
    const { id } = req.params
    const loggedUser = req.user 
    const data = req.body

    const updatedUser = await updateUserServices(id, data, loggedUser)

    res.status(200).json({
      message: 'Usuario actualizado correctamente',
      updatedUser,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
    createUserControllers,
    getUSerControllers,
    loginControllers,
    updateUserControllers
}