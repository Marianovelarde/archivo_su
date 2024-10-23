const {EntityUser} = require('../../db')


const createUserRepository = async  (usuario, contraseña) => {

    const createUSer = await EntityUser.create({usuario,contraseña})

    return createUSer
} 

const getUserRepository = async () => {

    const getUSer = await EntityUser.findAll()

    return getUSer

}

const getUserByNameRepository = async (usuario) => {
    return await EntityUser.findOne({where: {usuario}})
}

module.exports = {
    createUserRepository,
    getUserRepository,
    getUserByNameRepository
}