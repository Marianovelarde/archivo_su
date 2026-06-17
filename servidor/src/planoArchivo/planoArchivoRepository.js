const {EntityPlanoArchivo} = require('../db')


const getPlanosArchivoRepository = async (id) => {
    const planos = await EntityPlanoArchivo.findByPk(id)
    return planos
}


module.exports = {
    getPlanosArchivoRepository
}