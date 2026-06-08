const express = require('express')

const {createAltaControllers, 
    getAltasControllers, 
    updateAltaControllers, 
    deleteAltasControllers, 
    getAltaByIdController } = require('../../altas/controllers/altasControllers')
const upload = require('../../middlewares/uploadPlano')
const { filterAndOrderControllers } = require('../../altas/filtersAndOrder/filtersAndOrderControllers')

const router = express.Router()

router.post('/', upload.array('planos', 30), createAltaControllers)
router.get('/', getAltasControllers)
router.get('/:id', getAltaByIdController)
router.put('/editar/:id', upload.array('planos', 30),   updateAltaControllers)
router.delete('/:id', deleteAltasControllers)
router.get('/filters', filterAndOrderControllers)



module.exports = router