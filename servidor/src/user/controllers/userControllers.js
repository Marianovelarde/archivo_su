const jwt = require('jsonwebtoken')
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../config/jwt')

const {createUserServices,
     getUserServices, 
     getUserByNameServices, 
     updateUserServices,
     deactivateUserService,
     changeUserRoleService
    } = require('../services/UserService')



    // const { createAuditLogService } = require('../../auditLog/services/auditLogService')

const deactivateUserController = async (req, res) => {
  try {
    const adminId = req.user.id
    const { id } = req.params

    const user = await deactivateUserService(id)

    // await createAuditLogService({
    //   action: 'DEACTIVATE',
    //   entity: 'USER',
    //   performedBy: adminId,
    //   targetUser: id,s
    //   description: 'Usuario desactivado',
    // })

    res.json(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al desactivar usuario' })
  }
}

const changeUserRoleController = async (req, res) => {
  try {

    const adminId = req.user.id_user
    const { id } = req.params
    const { role } = req.body

    const user = await changeUserRoleService(id, role)

    // await createAuditLogService({
    //   action: 'ROLE_CHANGE',
    //   entity: 'USER',
    //   performedBy: adminId,
    //   targetUser: id,
    //   description: `Rol cambiado a ${role}`,
    // })

    res.json(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al cambiar rol' })
  }
}
const createUserControllers = async (req, res) => {
  try {

    const { usuario, contraseña, role, isAdmin } = req.body

    if (!usuario || !contraseña) {
      return res.status(400).json({
        message: 'Usuario y contraseña son requeridos',
      })
    }

    const createUser = await createUserServices(
      usuario,
      contraseña,
      isAdmin,
      role
    )

    return res.status(201).json({
      message: 'Usuario creado correctamente',
      createUser,
    })

  } catch (error) {

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: 'El usuario ya existe',
      })
    }

    console.error(error)

    return res.status(500).json({
      message: 'Error interno del servidor',
    })
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
    role: user.role,
    isAdmin: user.isAdmin,
    isActived: user.isActived,
  },
})
  } catch (error) {
    console.error('[LOGIN ERROR]', error)
    res.status(500).json({
      message: 'Usuario o contraseña incorrectos',
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
    updateUserControllers,
    deactivateUserController,
    changeUserRoleController
}