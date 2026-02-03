const express = require('express')

const {
getAllAuditLogsControllers, testAuditLog} = require('../../auditLog/controllers/auditLogsControllers')

const router = express.Router()

router.post('/create', testAuditLog)
router.get('/', getAllAuditLogsControllers)
module.exports = router