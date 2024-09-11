const express = require('express')

const {createAltaControllers, getAltasControllers, updateAltaControllers, deleteAltasControllers } = require('../../altas/controllers/altasControllers')

const router = express.Router()

router.post('/', createAltaControllers)
router.get('/', getAltasControllers)
router.put('/:id', updateAltaControllers)
router.delete('/:id', deleteAltasControllers)



module.exports = router