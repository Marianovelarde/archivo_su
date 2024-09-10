const express = require('express')

const {
    createDestinoControllers,
    getAllDestinoControllers,
    updateDestinoControllers
} = require('../controllers/destinoControllers')

const router = express.Router()

router.post('/', createDestinoControllers)
router.get('/', getAllDestinoControllers)
router.put('/:id', updateDestinoControllers)

module.exports = router