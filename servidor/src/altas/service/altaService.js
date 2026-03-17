const {EntityAltas} = require ('../../db')
const { Sequelize } = require('sequelize')

const {
    createAltaRepository,
    getAltasRepository,
    updateAltaRepository,
    deleteAltasRepository,
    getAltaByIdRepository} = require('../repository/altasRepository')




const createAltaService = async (data) => {
  try {
    // 🔥 normalizar
    data.num_de_ficha = data.num_de_ficha.toUpperCase()

    // 🔥 validar duplicado case-insensitive
    const existe = await EntityAltas.findOne({
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('num_de_ficha')),
        data.num_de_ficha.toLowerCase()
      )
    })

    if (existe) {
      const error = new Error('La ficha ya existe')
      error.status = 400
      throw error
    }

    return await createAltaRepository(data)

  } catch (error) {
    console.error('🔥 Error en createAltaService:', error)

    // 🔥 fallback por si lo detecta DB
    if (
      error.name === 'SequelizeUniqueConstraintError' ||
      error.parent?.code === '23505'
    ) {
      const newError = new Error('La ficha ya existe')
      newError.status = 400
      throw newError
    }

    throw error
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