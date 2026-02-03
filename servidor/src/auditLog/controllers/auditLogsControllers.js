const {getAllAuditLogService} = require('../services/auditLogService')
const {EntityAuditLogs} = require('../../db')

const getAllAuditLogsControllers = async (req,res) => {

    try {
        const logs = await getAllAuditLogService()
        res.status(200).json(logs)

    } catch (error) {
        console.error('error:', error)
        res.status(500).json({message: 'Error  al obtener auditoria'})
    }
}
const testAuditLog = async (req, res) => {
  const log = await  EntityAuditLogs.create({
  action: 'TEST',
  entity: 'SYSTEM',
  description: 'Registro de prueba',
  performed_by: 1,   // usuario que ejecuta
  target_user: 1,    // usuario afectado
})


  res.json(log)
}

module.exports = {
    getAllAuditLogsControllers,
    testAuditLog
}