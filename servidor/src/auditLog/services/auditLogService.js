const {createAuditLogRepository, getAllAuditLogRepository} = require('../repository/auditLogRepository')



const createAuditLogService = async( action,
  performedBy,
  targetUser,
  details = '') => {

    const create = await createAuditLogRepository( 
        action,
        performedBy,
        targetUser,
        details)

        if(create ) {
            throw new Error('Error en service')
        }
        return create
}

const getAllAuditLogService = async () => {

    const getAll = getAllAuditLogRepository()

    return getAll
}

module.exports = {
    createAuditLogService,
    getAllAuditLogService
}