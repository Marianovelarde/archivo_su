const requireSelfOrAdmin = (req, res, next) => {
  const targetId = Number(req.params.id)

  if (req.user.isAdmin) return next()

  if (req.user.id_user !== targetId) {
    return res.status(403).json({
      message: 'No autorizado'
    })
  }

  next()
}

module.exports = requireSelfOrAdmin
