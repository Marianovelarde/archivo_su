const express = require('express')

const {
    createPlanoControllers,
    getAllPlanosControllers,
    updatePlanoControllers
} = require('../../tipoPlano/controllers/createPlanoControllers')

const router = express.Router()

router.post('/', createPlanoControllers)
router.get('/', getAllPlanosControllers)
router.put('/:id', updatePlanoControllers)

module.exports = router