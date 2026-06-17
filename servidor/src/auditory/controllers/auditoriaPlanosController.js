// src/controllers/auditoriaPlanosController.js

const {
  createAuditoriaPlanoService,
  getAuditoriaPlanoService
} = require('../service/auditoriaPlanosService')

const createAuditoriaPlanoController = async (req, res) => {

  try {

    const {
      id_user,
      id_plano,
      id_alta,
      ip
    } = req.body

    const auditoria = await createAuditoriaPlanoService({
      id_user,
      id_plano,
      id_alta,
      ip
    })

    return res.status(201).json(auditoria)

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      error: 'Error al registrar auditoría'
    })
  }
}
const getAuditoriaPlanoController = async (req, res) => {

  try {

    const auditoria = await getAuditoriaPlanoService()

    return res.status(200).json(auditoria)

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      error: 'Error al obtener auditoría'
    })
  }
}

module.exports = {
  createAuditoriaPlanoController,
  getAuditoriaPlanoController
}