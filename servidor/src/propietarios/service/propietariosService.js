const {
createPropietariosRepository,
getAllPropietariosRepository,
updatePropietariosRepository,
deletePropietariosRepository
} = require('../repository/propietariosRepository')

const createPropietariosService = async ({nombre,apellido,domicilio_postal,cuil,email}) => {
    
    try {
        return createPropietariosRepository({nombre,apellido,domicilio_postal,cuil,email})
    } catch (error) {
        console.error('Error en service: ', error)
        throw new Error('Error en service')
    }
};

const updatePropietariosService = async (data, id_propietario) => {

    
    try {
        const update_propietario = await updatePropietariosRepository(data, id_propietario)
        return update_propietario
    } catch (error) {
        console.error('error: ', error.message)
        throw new Error('Error en service.', error)
    }
}
const getAllPropietariosService = async () => {
    try {
        const get_propietarios = await getAllPropietariosRepository()
        return get_propietarios
    } catch (error) {
        throw new Error('Error en service: ', error)
    }
};

const deletePropietariosService = async (id_propietario) => {
    try {
        const delete_propietarios = await deletePropietariosRepository(id_propietario)
        return delete_propietarios
    } catch (error) {
        console.error('Error en service: ', error.message)
        throw new Error('Error en service')
    }
}

module.exports = {
    createPropietariosService,
    updatePropietariosService,
    deletePropietariosService,
    getAllPropietariosService
}