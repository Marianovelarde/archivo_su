const { EntityUser } = require('../../db')

const createUserRepository = async (usuario, contraseña, isAdmin, role) => {
  const createUser = await EntityUser.create({
    usuario,
    contraseña,
    isAdmin,
    role
  })

  return createUser
}

const getUserRepository = async () => {
  return await EntityUser.findAll({
    attributes: { exclude: ['contraseña'] }
  })
}

const getUserByNameRepository = async (usuario) => {
  return await EntityUser.findOne({ where: { usuario } })
}

const getUserByIdRepository = async (id) => {
  return await EntityUser.findByPk(id)
}

const updateUserRepository = async (id_user, data) => {
  const user = await EntityUser.findByPk(id_user)
  if (!user) return null

  await user.update(data)
  return user
}

const deactivateUserRepository = async (id) => {
  const user = await EntityUser.findByPk(id)

  if (!user) throw new Error('Usuario no encontrado')

  user.isActived = false
  await user.save()

  return user
}

const changeUserRoleRepository = async (id, role) => {
  const user = await EntityUser.findByPk(id)

  if (!user) throw new Error('Usuario no encontrado')

  user.role = role
  await user.save()

  return user
}

module.exports = {
  createUserRepository,
  getUserRepository,
  getUserByNameRepository,
  getUserByIdRepository,
  updateUserRepository,
  deactivateUserRepository,
  changeUserRoleRepository
}