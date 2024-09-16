const express = require('express')

const {
    createDestinoControllers,
    getAllDestinoControllers,
    updateDestinoControllers,
    deleteDestinoControllers
} = require('../controllers/destinoControllers')
const { filterAndOrderControllers } = require('../filtersAndOrdersDest/filtersAndOrderDestControllers')

const router = express.Router()

router.post('/', createDestinoControllers)
router.get('/', getAllDestinoControllers)
router.put('/:id', updateDestinoControllers)
router.delete('/:id', deleteDestinoControllers)
router.get('/filters', filterAndOrderControllers)
module.exports = router