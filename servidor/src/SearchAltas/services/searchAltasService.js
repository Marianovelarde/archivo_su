const { searchAltasRepository } = require('../repository/searchAltasRepository')

const searchAltasService = async (filters) => {
  return await searchAltasRepository(filters)
}

module.exports = { searchAltasService }
