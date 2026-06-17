const router = require('express').Router()

const {
  createAuditoriaPlanoController,
  getAuditoriaPlanoController
} = require('../../auditory/controllers/auditoriaPlanosController')

router.post(
  '/',
  createAuditoriaPlanoController
)

router.get(
  '/',
  getAuditoriaPlanoController
)

module.exports = router