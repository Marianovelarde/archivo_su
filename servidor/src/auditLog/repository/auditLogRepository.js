const {EntityAuditLog} = require('../../db')


const createAuditLogRepository = async (auditData) => {

    const create = await EntityAuditLog.create(auditData)

    return create
}

const getAllAuditLogRepository = async () => {
    const getAll = await EntityAuditLog.findAll({
        order: [['createAt', 'DESC']]
    })
    return getAll
}


module.exports = {
    createAuditLogRepository,
    getAllAuditLogRepository
}