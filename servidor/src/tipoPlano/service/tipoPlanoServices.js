const {createPlanoRepository, getAllPlanosRepository} = require('../repository/tipoPlanoRepository')

const createPlanoService = async (tipo_plano) => {
    
    
    try {
        return await createPlanoRepository({tipo_plano})
    } catch (error) {
        console.error('Error en servicio: ', error)
        throw error
    }
}
const getAllPlanosService = async () => {
    try {
        const get_all_planos = await getAllPlanosRepository()
        return get_all_planos
    } catch (error) {
        throw new Error ('Error en service: ', error)
    }
}

module.exports = {
    createPlanoService,
    getAllPlanosService
}