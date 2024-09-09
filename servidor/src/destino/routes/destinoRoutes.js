const express = require('express')

const {
    createDestinoControllers,
    getAllDestinoControllers
} = require('../controllers/destinoControllers')

const router = express.Router()

router.post('/', createDestinoControllers)
router.get('/', getAllDestinoControllers)

module.exports = router