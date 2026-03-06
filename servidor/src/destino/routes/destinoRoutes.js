const express = require('express')

const {
    createDestinoControllers,
    getAllDestinoControllers,
    updateDestinoControllers,
    deleteDestinoControllers
} = require('../controllers/destinoControllers')
const { filterAndOrderControllers } = require('../filtersAndOrdersDest/filtersAndOrderDestControllers')

const router = express.Router()

router.post('/create', createDestinoControllers)
router.get('/', getAllDestinoControllers)
router.put('/edit/:id', updateDestinoControllers)
router.delete('/:id', deleteDestinoControllers)
router.get('/filters', filterAndOrderControllers)
module.exports = router