const express = require('express')
const routesDestino = require('../destino/routes/index')
const planoRoutes = require('../destino/routes/index')
const altasRoutes = require('../destino/routes/altasRoutes')

const router = express.Router()

router.use('/', routesDestino)
router.use('/', planoRoutes)
router.use('/', altasRoutes)

module.exports = router