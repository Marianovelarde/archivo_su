const express = require('express')

const {
    createPropietariosControllers,
    getAllPropietariosControllers,
    updatePropietariosControllers,
    deletePropietariosControllers
} = require('../../propietarios/controllers/propietariosControllers')

const router = express.Router()

router.post('/', createPropietariosControllers)
router.get('/', getAllPropietariosControllers)
router.put('/:id', updatePropietariosControllers)
router.delete('/:id', deletePropietariosControllers)

module.exports = router