const express = require('express')

const {
    createPropietariosControllers
} = require('../../propietarios/controllers/propietariosControllers')

const router = express.Router()

router.post('/', createPropietariosControllers)

module.exports = router