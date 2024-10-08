const {createPlanoRepository, getAllPlanosRepository, updatePlanoRepository, deletePlanosRepository} = require('../repository/tipoPlanoRepository')

const createPlanoService = async (tipo_plano) => {
    
    
    try {
        return await createPlanoRepository({tipo_plano})
    } catch (error) {
        console.error('Error en servicio: ', error)
        throw error
    }
};
 const updatePlanoService = async (data, id_tipo_plano) => {
    try {
        const update_plano = await updatePlanoRepository(data, id_tipo_plano)
    return update_plano
    } catch (error) {
        throw new Error('Error en service')
    }
 }

const getAllPlanosService = async () => {
    try {
        const get_all_planos = await getAllPlanosRepository()
        return get_all_planos
    } catch (error) {
        throw new Error ('Error en service: ', error)
    }
};
const deletePlanosService = async (id_tipo_plano) => {
    try {
        const delete_planos = await deletePlanosRepository(id_tipo_plano)
        return delete_planos
    } catch (error) {
        throw new Error('Error en service: ', error.message)
    }
};

module.exports = {
    createPlanoService,
    updatePlanoService,
    getAllPlanosService,
    deletePlanosService
}