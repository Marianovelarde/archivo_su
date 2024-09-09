const {
createPropietariosRepository
} = require('../repository/propietariosRepository')

const createPropietariosService = async ({nombre,apellido,domicilio_postal,cuil,email}) => {
    console.log('Service: ',nombre,apellido,domicilio_postal,cuil,email);
    
    try {
        return createPropietariosRepository({nombre,apellido,domicilio_postal,cuil,email})
    } catch (error) {
        console.error('Error en service: ', error)
        throw error
    }
}

module.exports = {
    createPropietariosService
}