const express = require('express')

const {
    createDestinoControllers
} = require('../controllers/destinoControllers')

const router = express.Router()

router.post('/', createDestinoControllers)

module.exports = router