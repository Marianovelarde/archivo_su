const requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({
      message: 'Acceso solo para administradores'
    })
  }

  next()
}

module.exports = requireAdmin
