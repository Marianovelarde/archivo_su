const {
  createAuditLogRepository,
  getAllAuditLogRepository
} = require('../repository/auditLogRepository')

const createAuditLogService = async ({
  action,
  entity,
  performedBy,
  targetUser = null,
  description = '',
}) => {

  if (!action || !entity || !performedBy) {
    throw new Error('Datos incompletos para auditoría')
  }

  const auditData = {
    action,
    entity,
    performed_by: performedBy,
    target_user: targetUser,
    description,
  }

  const log = await createAuditLogRepository(auditData)

  return log
}

const getAllAuditLogService = async () => {
  return await getAllAuditLogRepository()
}

module.exports = {
  createAuditLogService,
  getAllAuditLogService
}