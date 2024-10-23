const express = require('express')

const {createUserControllers, getUSerControllers, loginControllers} = require('../../user/controllers/userControllers')

const router = express.Router()

router.get('/', getUSerControllers)
router.post('/login', loginControllers)
router.post('/signup', createUserControllers)

module.exports = router