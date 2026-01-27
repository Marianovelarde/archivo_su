const express = require('express')

const {createUserControllers, getUSerControllers, loginControllers, updateUserControllers} = require('../../user/controllers/userControllers')
const authMiddleware  = require('../../middlewares/authMiddleware')
const requireSelfOrAdmin = require('../../middlewares/requireSelfOrAdmin')
const requireAdmin = require('../../middlewares/requireAdmin')
const router = express.Router()

router.get('/', authMiddleware, requireAdmin, getUSerControllers)
router.post('/login', loginControllers)
router.post('/signup', authMiddleware, requireAdmin, createUserControllers)
router.put('/:id', authMiddleware, requireSelfOrAdmin, updateUserControllers)
module.exports = router