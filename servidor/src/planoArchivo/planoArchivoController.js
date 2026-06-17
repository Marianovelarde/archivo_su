const path = require('path')
const {
    getPlanosArchivoService,
} = require('./planoArchivoService');

const {createAuditoriaPlanoService} = require('../auditory/auditoriaPlanosService')

const getPlanoArchivoController = async (req, res) => {
    
    try {
        const {id} = req.params
        const planos = await getPlanosArchivoService(id)

        await createAuditoriaPlanoService({
            id_user: req.user.id_user,
            id_plano: planos.id,
            id_alta: planos.id_alta,
            ip: req.ip,
            fecha_acceso: new Date()
        })
        const completeRoute = path.join(
  process.cwd(),
  planos.path
)

        return res.sendFile(completeRoute)
    } catch (error) {
        console.error('Error al obtener el plano:', error)
        return res.status(500).json({ error: 'Error al obtener el plano' })
    }

}

module.exports = {
    getPlanoArchivoController
}