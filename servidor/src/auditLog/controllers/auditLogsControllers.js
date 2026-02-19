const { getAllAuditLogService } = require('../services/auditLogService')
const { createAuditLogService } = require('../../auditLog/services/auditLogService')
const { createUserService } = require('../../user/services/UserService')

const getAllAuditLogsControllers = async (req, res) => {
  try {
    const logs = await getAllAuditLogService()
    res.status(200).json(logs)
  } catch (error) {
    console.error('error:', error)
    res.status(500).json({ message: 'Error al obtener auditoria' })
  }
}

const createUserController = async (req, res) => {
  try {
    // 🔐 usuario que ejecuta la acción (desde JWT)
    const adminId = req.user.id_user

    const newUser = await createUserService(req.body)

    // 🧾 AUDITORÍA (ajustada al modelo entityAuditLogs)
    await createAuditLogService({
      action: 'CREATE',
      performedBy: adminId,
      targetUser: newUser.id_user, // ⚠️ importante
      description: `Usuario ${newUser.usuario} creado`,
    })

    res.status(201).json(newUser)

  } catch (error) {
    console.error('CREATE USER ERROR:', error)
    res.status(500).json({ message: 'Error al crear usuario' })
  }
}

module.exports = {
  getAllAuditLogsControllers,
  createUserController
}
