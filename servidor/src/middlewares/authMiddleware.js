const { EntityUser } = require('../db')

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/jwt')

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ message: 'No autorizado' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Token inválido' })
    }

    const decoded = jwt.verify(token, JWT_SECRET)

    const user = await EntityUser.findByPk(decoded.id_user)

    if (!user || !user.isActived) {
      return res.status(401).json({ message: 'Usuario inválido' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado o inválido' })
  }
}

module.exports = authMiddleware
