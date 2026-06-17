const {
    getPlanosArchivoRepository
} = require('./planoArchivoRepository');

const getPlanosArchivoService = async (id) => {
    const planos = await getPlanosArchivoRepository(id)

    if(!planos) {
        throw new Error('No se encontraron planos para el alta especificada')
    }
    return planos
}

module.exports = {
    getPlanosArchivoService
}