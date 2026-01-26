const express = require('express')

const {createUserControllers, getUSerControllers, loginControllers, updateUserControllers} = require('../../user/controllers/userControllers')
const authMiddleware = require('../../middlewares/authMiddleware')
const router = express.Router()

router.get('/', getUSerControllers)
router.post('/login', loginControllers)
router.post('/signup', createUserControllers)
router.put('/:id', authMiddleware, updateUserControllers)
module.exports = router