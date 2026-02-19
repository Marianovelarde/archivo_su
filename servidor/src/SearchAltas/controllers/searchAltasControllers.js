const { searchAltasService } = require('../services/searchAltasService')

const searchAltasController = async (req, res) => {
  try {
    const filters = req.query

    const results = await searchAltasService(filters)

    res.status(200).json(results)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error en búsqueda de altas' })
  }
}

module.exports = { searchAltasController }
