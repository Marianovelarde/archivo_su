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
const { createAuditLogService } = require('../../auditLog/services/auditLogService')

const createUserController = async (req, res) => {
  try {

    const adminId = req.user.id   // del JWT

    const newUser = await createUserService(req.body)

    await createAuditLogService({
      action: 'CREATE',
      entity: 'USER',
      performedBy: adminId,
      targetUser: newUser.id,
      description: 'Usuario creado',
    })

    res.status(201).json(newUser)

  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario' })
  }
}

module.exports = {
    getAllAuditLogsControllers,
    createUserController
}