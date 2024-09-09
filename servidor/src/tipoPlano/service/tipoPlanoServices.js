const {createPlanoRepository} = require('../repository/tipoPlanoRepository')

const createPlanoService = async (tipo_plano) => {
    
    
    try {
        return await createPlanoRepository({tipo_plano})
    } catch (error) {
        console.error('Error en servicio: ', error)
        throw error
    }
}

module.exports = {
    createPlanoService
}