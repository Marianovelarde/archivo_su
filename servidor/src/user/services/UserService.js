const {createUserRepository, getUserRepository, getUserByNameRepository} = require('../repository/UserRepository')
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


module.exports = {
    createUserServices,
    getUserServices,
    getUserByNameServices
}