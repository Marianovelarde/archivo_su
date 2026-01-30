const {getAllAuditLogService} = require('../services/auditLogService')


const getAllAuditLogsControllers = async (req,res) => {

    try {
        const logs = await getAllAuditLogService()
        res.status(200).json(logs)

    } catch (error) {
        res.status(500).json({message: 'Error  al obtener auditoria'})
    }
}

module.exports = {
    getAllAuditLogsControllers
}