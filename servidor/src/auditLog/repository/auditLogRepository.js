const { EntityAuditLogs, EntityUser } = require('../../db')



const createAuditLogRepository = async (auditData) => {

    const create = await EntityAuditLogs.create(auditData)

    return create
}

const getAllAuditLogRepository = async () => {
  return await EntityAuditLogs.findAll({
    include: {
      model: EntityUser,
      attributes: ['usuario'],
    },
    order: [['createdAt', 'DESC']],
  })
}



module.exports = {
    createAuditLogRepository,
    getAllAuditLogRepository
}