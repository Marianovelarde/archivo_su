const express = require('express')

const destinoRoutes = require('../routes/destinoRoutes')
const planoRoutes  = require('../routes/planoRoutes')
const  propietariosRoutes = require('../routes/propietariosRoutes')
const altasRoutes = require('../routes/altasRoutes')
const userRoutes = require('../routes/userRoutes')
const auditLogsRoutes = require('../routes/auditLogsRoutes')
const searchAltasRoutes = require('../routes/searchAltasRoutes')

const router = express.Router()

router.use('/user', userRoutes)
router.use('/destino', destinoRoutes)
router.use('/planos', planoRoutes)
router.use('/propietarios', propietariosRoutes)
router.use('/altas', altasRoutes)
router.use('/audit', auditLogsRoutes)
router.use('/search', searchAltasRoutes)
module.exports = router