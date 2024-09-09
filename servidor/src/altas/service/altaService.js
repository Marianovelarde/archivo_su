const {createAltaRepository} = require('../repository/altasRepository')


const createAltaService = async (data) => {
try {
    return createAltaRepository(data)
} catch (error) {
    throw new Error('Error en service: ', error.message)
}
}

module.exports = {
    createAltaService
}