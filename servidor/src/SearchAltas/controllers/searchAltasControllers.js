const { searchAltasService } = require('../services/searchAltasService')

const searchAltasController = async (req, res) => {
  
  try {
    const filters = req.query

    const results = await searchAltasService(filters)

    // 🔎 PRIMERO validar si no hay resultados
    if (!results.length) {
      return res.status(404).json({
        message: 'No existe alta registrada con la información brindada.'
      })
    }

    // 🔎 SOLO SI hay resultados
    return res.status(200).json(results)

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: error.message || 'Error en búsqueda de altas'
    })
  }
}

module.exports = { searchAltasController }