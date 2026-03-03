const {
    createAltaRepository,
    getAltasRepository,
    updateAltaRepository,
    deleteAltasRepository,
    getAltaByIdRepository} = require('../repository/altasRepository')


const createAltaService = async (data) => {
try {
    return createAltaRepository(data)
} catch (error) {
    throw new Error('Error en service: ', error.message)
}
}

const updateAltasService = async (id_alta, data) => {

    
    
    try {
        const update_alta = await updateAltaRepository(id_alta,data)
        console.log(update_alta);
        
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
};
const getAltaByIdService = async (id_Altas) => {
    try {
      const alta = await getAltaByIdRepository(id_Altas)
      if (!alta) {
        throw new Error('Alta no encontrada')
      }
      return alta
    } catch (error) {
      throw new Error(error.message)
    }
  }
const deleteAltasService = async (id_Altas) => {
    try {
        const delete_altas = await deleteAltasRepository(id_Altas)
        return delete_altas
    } catch (error) {
        throw new Error('Error en service', error.message)
    }
}

module.exports = {
    createAltaService,
    deleteAltasService,
    getAltasService,
    updateAltasService,
    getAltaByIdService
}