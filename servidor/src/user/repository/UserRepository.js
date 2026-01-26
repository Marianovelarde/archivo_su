const {EntityUser} = require('../../db')


const createUserRepository = async  (usuario, contraseña, isAdmin) => {

    const createUSer = await EntityUser.create({usuario,contraseña, isAdmin})

    return createUSer
} 

const getUserRepository = async () => {
  return await EntityUser.findAll({
    attributes: { exclude: ['contraseña'] }
  })
}


const getUserByNameRepository = async (usuario) => {
    return await EntityUser.findOne({where: {usuario}})
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


module.exports = {
    createUserRepository,
    getUserRepository,
    getUserByNameRepository,
    getUserByIdRepository,
    updateUserRepository
}