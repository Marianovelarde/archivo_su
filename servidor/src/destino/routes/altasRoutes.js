const express = require('express')

const {createAltaControllers, getAltasControllers } = require('../../altas/controllers/altasControllers')

const router = express.Router()

router.post('/', createAltaControllers)
router.get('/', getAltasControllers)



module.exports = router