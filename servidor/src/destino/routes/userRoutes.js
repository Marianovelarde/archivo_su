const express = require('express')

const {createUserControllers, getUSerControllers, loginControllers, updateUserControllers, deactivateUserController, changeUserRoleController} = require('../../user/controllers/userControllers')
const authMiddleware  = require('../../middlewares/authMiddleware')
const requireSelfOrAdmin = require('../../middlewares/requireSelfOrAdmin')
const requireAdmin = require('../../middlewares/requireAdmin')
const router = express.Router()

router.get('/', authMiddleware, requireAdmin, getUSerControllers)
router.post('/login', loginControllers)
router.post('/signup', authMiddleware, requireAdmin, createUserControllers)
router.put('/edit/:id', authMiddleware, requireSelfOrAdmin, updateUserControllers)
router.put('/:id/deactivate', authMiddleware, requireAdmin, deactivateUserController)
router.put('/role/:id',authMiddleware, requireAdmin, changeUserRoleController)
module.exports = router