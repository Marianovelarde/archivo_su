const express = require('express')

const {
    createPropietariosControllers,
    getAllPropietariosControllers
} = require('../../propietarios/controllers/propietariosControllers')

const router = express.Router()

router.post('/', createPropietariosControllers)
router.get('/', getAllPropietariosControllers)

module.exports = router