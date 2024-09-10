const {
    createDestinoRepositories,
    getAllDestinosRepository,
    updateDestinoRepository
} = require('../repositories/destinoRepositories')

const createDestinoService = async (tipo_de_destino) => {
    try {
        return await createDestinoRepositories({tipo_de_destino});
    } catch (error) {
        console.error('Error en servicio:', error);
        throw error;
    }
};

const updateDestinoService = async (data, id_destino) => {
    try {
        const update_destino = await updateDestinoRepository(data, id_destino)
        return update_destino
    } catch (error) {
        throw new Error ('Error en service')
    }
}
const getAllDestinosService = async () => {
    try {
        const getAllDestinos = await getAllDestinosRepository()
        return getAllDestinos
    } catch (error) {
        console.error('Error en service: ', error)
        throw new Error('Error en service', error)
    }
}

module.exports = {
    createDestinoService,
    updateDestinoService,
    getAllDestinosService
}