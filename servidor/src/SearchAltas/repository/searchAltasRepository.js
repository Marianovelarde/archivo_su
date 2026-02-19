const { Op } = require('sequelize')
const { EntityAltas, EntityPropietarios, EntityDestino, EntityPlano } = require('../../db')

const searchAltasRepository = async (filters) => {

  const whereAltas = {}
  const wherePropietario = {}
  const whereDestino = {}
  const wherePlano = {}

  // 🔎 ALTAS
  if (filters.num_de_exp) {
    whereAltas.num_de_exp = { [Op.iLike]: `%${filters.num_de_exp}%` }
  }

  if (filters.num_de_ficha) {
    whereAltas.num_de_ficha = { [Op.iLike]: `%${filters.num_de_ficha}%` }
  }

  if (filters.barrio) {
    whereAltas.barrio = { [Op.iLike]: `%${filters.barrio}%` }
  }

  if (filters.calle) {
    whereAltas.calle = { [Op.iLike]: `%${filters.calle}%` }
  }

  if (filters.distrito) whereAltas.distrito = filters.distrito
  if (filters.zona) whereAltas.zona = filters.zona
  if (filters.manzana) whereAltas.manzana = filters.manzana
  if (filters.parcela) whereAltas.parcela = filters.parcela

  // 🔎 PROPIETARIO
  if (filters.nombre) {
    wherePropietario.nombre = { [Op.iLike]: `%${filters.nombre}%` }
  }

  if (filters.apellido) {
    wherePropietario.apellido = { [Op.iLike]: `%${filters.apellido}%` }
  }

  if (filters.cuil) {
    wherePropietario.cuil = { [Op.iLike]: `%${filters.cuil}%` }
  }

  // 🔎 DESTINO
  if (filters.tipo_destino) {
    whereDestino.tipo_de_destino = { [Op.iLike]: `%${filters.tipo_destino}%` }
  }

  // 🔎 PLANO
  if (filters.tipo_plano) {
    wherePlano.tipo_plano = { [Op.iLike]: `%${filters.tipo_plano}%` }
  }

  return await EntityAltas.findAll({
    where: whereAltas,
    include: [
      {
        model: EntityPropietarios,
        where: wherePropietario,
        required: Object.keys(wherePropietario).length > 0
      },
      {
        model: EntityDestino,
        where: whereDestino,
        required: Object.keys(whereDestino).length > 0
      },
      {
        model: EntityPlano,
        where: wherePlano,
        required: Object.keys(wherePlano).length > 0
      }
    ],
    order: [['fecha_de_aprob', 'DESC']]
  })
}

module.exports = { searchAltasRepository }
