const express = require('express')

const {createAltaControllers, getAltasControllers, updateAltaControllers } = require('../../altas/controllers/altasControllers')

const router = express.Router()

router.post('/', createAltaControllers)
router.get('/', getAltasControllers)
router.put('/:id', updateAltaControllers)



module.exports = router