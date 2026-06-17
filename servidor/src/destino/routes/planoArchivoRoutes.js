const express = require('express');

const {
    getPlanoArchivoController
} = require('../../planoArchivo/planoArchivoController')

const authMiddleware = require('../../middlewares/authMiddleware')

const router = express.Router();

router.get('/ver/:id', authMiddleware, getPlanoArchivoController)

module.exports = router;