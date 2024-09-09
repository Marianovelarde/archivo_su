const express = require('express')

const {createAltaControllers } = require('../../altas/controllers/altasControllers')

const router = express.Router()

router.post('/', createAltaControllers)



module.exports = router