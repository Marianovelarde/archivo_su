const {
createPropietariosRepository,
getAllPropietariosRepository,
updatePropietariosRepository
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

const updatePropietariosService = async (data, id_propietarios) => {
    console.log('data en service: ', data);
    console.log('id en service: ', id_propietarios);
    
    try {
        const update_propietario = await updatePropietariosRepository(data, id_propietarios)
        return update_propietario
    } catch (error) {
        console.error('error: ', error.message)
        throw new Error('Error en service.', error)
    }
}
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
    updatePropietariosService,
    getAllPropietariosService
}