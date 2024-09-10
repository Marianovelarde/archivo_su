const express = require('express')

const {
    createPropietariosControllers,
    getAllPropietariosControllers,
    updatePropietariosControllers
} = require('../../propietarios/controllers/propietariosControllers')

const router = express.Router()

router.post('/', createPropietariosControllers)
router.get('/', getAllPropietariosControllers)
router.put('/:id', updatePropietariosControllers)

module.exports = router