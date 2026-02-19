const express = require('express')

const router = express.Router()


const { searchAltasController } = require('../../SearchAltas/controllers/searchAltasControllers')

router.get('/', searchAltasController)


module.exports = router