const express = require('express')

const {
    createPropietariosControllers,
    getAllPropietariosControllers,
    updatePropietariosControllers,
    deletePropietariosControllers
} = require('../../propietarios/controllers/propietariosControllers')
const { filterAndOrderControllers } = require('../../propietarios/filtersAndOrder/filtersAndOrderControllers')

const router = express.Router()

router.post('/', createPropietariosControllers)
router.get('/', getAllPropietariosControllers)
router.put('/:id', updatePropietariosControllers)
router.delete('/:id', deletePropietariosControllers)
router.get('/filters', filterAndOrderControllers)

module.exports = router