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

  if (!action || !performedBy) {
    throw new Error('Datos incompletos para auditoría')
  }

  const auditData = {
    action,
    performed_by: performedBy,
    target_user: targetUser,
    details: description,
  }

  return await createAuditLogRepository(auditData)
}


const getAllAuditLogService = async () => {
  return await getAllAuditLogRepository()
}

module.exports = {
  createAuditLogService,
  getAllAuditLogService
}