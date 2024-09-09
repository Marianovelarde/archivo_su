const {
createPropietariosRepository,
getAllPropietariosRepository
} = require('../repository/propietariosRepository')

const createPropietariosService = async ({nombre,apellido,domicilio_postal,cuil,email}) => {
    console.log('Service: ',nombre,apellido,domicilio_postal,cuil,email);
    
    try {
        return createPropietariosRepository({nombre,apellido,domicilio_postal,cuil,email})
    } catch (error) {
        console.error('Error en service: ', error)
        throw error
    }
};

const getAllPropietariosService = async () => {
    try {
        const getPropietarios = await getAllPropietariosRepository()
        return getPropietarios
    } catch (error) {
        throw new Error('Error en service: ', error)
    }
}

module.exports = {
    createPropietariosService,
    getAllPropietariosService
}