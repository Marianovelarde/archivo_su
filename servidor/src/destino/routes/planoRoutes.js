const express = require('express')

const {
    createPlanoControllers,
    getAllPlanosControllers
} = require('../../tipoPlano/controllers/createPlanoControllers')

const router = express.Router()

router.post('/', createPlanoControllers)
router.get('/', getAllPlanosControllers)

module.exports = router