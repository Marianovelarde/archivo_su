
const {
    createAuditoriaPlanoService,
    getAuditoriaPlanoService
} = require('../auditory/auditoriaPlanosService')

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
        res.status(201).json(auditoria)
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la auditoria' })
    }   
}

const getAuditoriaPlanosController = async (req, res) => {

  try {

    const auditoria = await getAuditoriaPlanoService()

    res.status(200).json(auditoria)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: 'Error al obtener auditoría'
    })

  }

}

module.exports = {
    createAuditoriaPlanoController,
    getAuditoriaPlanosController
}