const {
    createAltaRepository,
    getAltasRepository,
    updateAltaRepository} = require('../repository/altasRepository')


const createAltaService = async (data) => {
try {
    return createAltaRepository(data)
} catch (error) {
    throw new Error('Error en service: ', error.message)
}
}

const updateAltasService = async (id_alta, data) => {
    console.log('id_alta service: ', id_alta);
    console.log('data en service: ', data);
    
    
    try {
        const update_alta = await updateAltaRepository(id_alta,data)
        return update_alta
    } catch (error) {

        console.error('error en controllers: ', error.message)
        throw new Error('Error en service: ', error)
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
    getAltasService,
    updateAltasService
}