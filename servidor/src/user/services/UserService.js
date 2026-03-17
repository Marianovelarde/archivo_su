const {
  createUserRepository,
  getUserRepository,
  getUserByNameRepository,
  updateUserRepository,
  getUserByIdRepository,
  changeUserRoleRepository,
  deactivateUserRepository
} = require('../repository/UserRepository')

const bcrypt = require('bcrypt')

const getUserServices = async () => {
  try {
    return await getUserRepository()
  } catch (error) {
    console.error(error)
    throw new Error('Error al mostrar los usuarios')
  }
}

const getUserByNameServices = async (usuario, contraseña) => {
  const user = await getUserByNameRepository(usuario)

  if (!user) throw new Error('Usuario no registrado')

  const isValidPassword = await bcrypt.compare(
    contraseña,
    user.contraseña
  )

  if (!isValidPassword) throw new Error('Contraseña incorrecta')

  return user
}

const createUserServices = async (
  usuario,
  contraseña,
  isAdmin,
  role
) => {
  const hashedPassword = await bcrypt.hash(contraseña, 10)

  return await createUserRepository(
    usuario,
    hashedPassword,
    isAdmin,
    role
  )
}

const updateUserServices = async (id_user, data) => {
  const user = await getUserByIdRepository(id_user)

  if (!user) throw new Error('Usuario no encontrado')

  const updateData = {}

  if (data.usuario) updateData.usuario = data.usuario
  if (typeof data.isAdmin === 'boolean') updateData.isAdmin = data.isAdmin
  if (typeof data.isActived === 'boolean') updateData.isActived = data.isActived
  if (data.role) updateData.role = data.role

  if (data.contraseña) {
    updateData.contraseña = await bcrypt.hash(data.contraseña, 10)
  }

  return await updateUserRepository(id_user, updateData)
}

const deactivateUserService = async (id) => {
  return await deactivateUserRepository(id)
}

const changeUserRoleService = async (id, role) => {
  return await changeUserRoleRepository(id, role)
}

module.exports = {
  createUserServices,
  getUserServices,
  getUserByNameServices,
  updateUserServices,
  deactivateUserService,
  changeUserRoleService
}