const express = require('express')

const {
    createPlanoControllers,
    getAllPlanosControllers,
    updatePlanoControllers,
    deletePlanosControllers
} = require('../../tipoPlano/controllers/tipoPlanoControllers')

const router = express.Router()

router.post('/', createPlanoControllers)
router.get('/', getAllPlanosControllers)
router.put('/:id', updatePlanoControllers)
router.delete('/:id', deletePlanosControllers)
module.exports = router