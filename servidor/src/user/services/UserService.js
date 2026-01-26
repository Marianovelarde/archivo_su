const {createUserRepository, getUserRepository, getUserByNameRepository, updateUserRepository,
  getUserByIdRepository,} = require('../repository/UserRepository')
const bcrypt = require('bcrypt');




const getUserServices = async () => {
    try {
        const getUser = await getUserRepository()
        return getUser
        
    } catch (error) {
        console.error(error)
        throw new Error('Error al mostrar los usuarios', error.message)
    }
};

const getUserByNameServices = async (usuario, contraseña,) => {
    const user = await getUserByNameRepository(usuario)
    if(!user)  throw new Error('Usuario no registrado')
    
    const isValidPassword = await bcrypt.compare(contraseña, user.contraseña)

    if(!isValidPassword) throw new Error('Contraseña incorrecta')

    return user;
}

const createUserServices = async(usuario, contraseña, isAdmin) => {
    
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    console.log('hashed: ', hashedPassword);
    
    return await createUserRepository(usuario, hashedPassword, isAdmin)
}

const updateUserServices = async (targetUserId, data, loggedUser) => {
  const targetUser = await getUserByIdRepository(targetUserId)
  if (!targetUser) throw new Error('Usuario no encontrado')

  // 👤 USUARIO COMÚN
  if (!loggedUser.isAdmin) {
    // solo puede cambiar SU contraseña
    if (loggedUser.id_user !== targetUser.id_user) {
      throw new Error('No autorizado')
    }

    if (!data.contraseña) {
      throw new Error('Debe ingresar una nueva contraseña')
    }

    const hashedPassword = await bcrypt.hash(data.contraseña, 10)

    return await updateUserRepository(targetUserId, {
      contraseña: hashedPassword,
      mustChangePassword: false,
    })
  }

  // 👑 ADMIN
  const updateData = {}

  if (data.usuario) updateData.usuario = data.usuario
  if (typeof data.isAdmin === 'boolean') updateData.isAdmin = data.isAdmin
  if (typeof data.isActived === 'boolean') updateData.isActived = data.isActived

  // reset / cambio de contraseña
  if (data.contraseña) {
    updateData.contraseña = await bcrypt.hash(data.contraseña, 10)
    updateData.mustChangePassword = true
  }

  return await updateUserRepository(targetUserId, updateData)
}

module.exports = {
    createUserServices,
    getUserServices,
    getUserByNameServices,
    updateUserServices
}