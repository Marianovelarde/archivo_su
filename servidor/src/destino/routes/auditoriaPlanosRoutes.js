const express = require('express');


const {
    createAuditoriaPlanoController,
    getAuditoriaPlanosController
} = require('../../auditory/auditoriaPlanosController')
const authMiddleware = require('../../middlewares/authMiddleware')
const requireAdmin = require('../../middlewares/requireAdmin')

const router = express.Router()

router.post('/create', authMiddleware, requireAdmin, createAuditoriaPlanoController)
router.get('/', authMiddleware, requireAdmin, getAuditoriaPlanosController)

module.exports = router