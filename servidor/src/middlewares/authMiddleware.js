const { EntityUser } = require('../db')

const authMiddleware = async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id']

    if (!userId) {
      return res.status(401).json({ message: 'No autorizado' })
    }

    const user = await EntityUser.findByPk(userId)

    if (!user || !user.isActived) {
      return res.status(401).json({ message: 'Usuario inválido' })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(500).json({ message: 'Error de autenticación' })
  }
}

module.exports = authMiddleware
