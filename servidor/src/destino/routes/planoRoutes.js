const express = require('express')

const {
    createPlanoControllers,
    getAllPlanosControllers,
    updatePlanoControllers,
    deletePlanosControllers
} = require('../../tipoPlano/controllers/tipoPlanoControllers')
const { filtersAndOrderControllers } = require('../../tipoPlano/filtersAndOrder/filtersAndOrderControllers')

const router = express.Router()

router.post('/create', createPlanoControllers)
router.get('/', getAllPlanosControllers)
router.put('/edit/:id', updatePlanoControllers)
router.delete('/:id', deletePlanosControllers)
router.get('/filters', filtersAndOrderControllers)
module.exports = router