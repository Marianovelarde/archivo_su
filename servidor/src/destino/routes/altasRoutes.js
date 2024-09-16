const express = require('express')

const {createAltaControllers, getAltasControllers, updateAltaControllers, deleteAltasControllers } = require('../../altas/controllers/altasControllers')
const { filterAndOrderControllers } = require('../../altas/filtersAndOrder/filtersAndOrderControllers')

const router = express.Router()

router.post('/', createAltaControllers)
router.get('/', getAltasControllers)
router.put('/:id', updateAltaControllers)
router.delete('/:id', deleteAltasControllers)
router.get('/filters', filterAndOrderControllers)



module.exports = router