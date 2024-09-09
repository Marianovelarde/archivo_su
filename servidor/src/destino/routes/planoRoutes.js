const express = require('express')

const {
    createPlanoControllers
} = require('../../tipoPlano/controllers/createPlanoControllers')

const router = express.Router()

router.post('/', createPlanoControllers)

module.exports = router