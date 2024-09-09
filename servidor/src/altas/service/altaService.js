const {
    createAltaRepository,
    getAltasRepository} = require('../repository/altasRepository')


const createAltaService = async (data) => {
try {
    return createAltaRepository(data)
} catch (error) {
    throw new Error('Error en service: ', error.message)
}
}

const getAltasService = async () => {
    try {
        return await getAltasRepository()
    } catch (error) {
        console.error('Error en service: ', error)
        throw new Error ('Error en service')
    }
}

module.exports = {
    createAltaService,
    getAltasService
}