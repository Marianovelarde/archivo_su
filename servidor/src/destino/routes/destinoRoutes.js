const express = require('express')

const {
    createDestinoControllers,
    getAllDestinoControllers,
    updateDestinoControllers,
    deleteDestinoControllers
} = require('../controllers/destinoControllers')

const router = express.Router()

router.post('/', createDestinoControllers)
router.get('/', getAllDestinoControllers)
router.put('/:id', updateDestinoControllers)
router.delete('/:id', deleteDestinoControllers)
module.exports = router