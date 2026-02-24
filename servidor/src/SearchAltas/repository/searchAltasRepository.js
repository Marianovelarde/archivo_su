const { Op } = require('sequelize')
const {
  EntityAltas,
  EntityPropietarios,
  EntityDestino,
  EntityPlano
} = require('../../db')

const searchAltasRepository = async (filters) => {

  const whereAltas = {}
  const wherePropietario = {}
  const whereDestino = {}
  const wherePlano = {}

  const hasValue = (value) =>
    value !== undefined &&
    value !== null &&
    value.toString().trim() !== ''

  // 🔎 CONSTRUIR EXPEDIENTE
  if (hasValue(filters.exp_num) && hasValue(filters.exp_letra)) {
    const expediente = `${filters.exp_num.trim()}-${filters.exp_letra.trim().toUpperCase()}`
    whereAltas.num_de_exp = expediente
  }

  // 🔎 CONSTRUIR FICHA
  if (hasValue(filters.ficha_num) && hasValue(filters.ficha_letra)) {
    const ficha = `${filters.ficha_num.trim()}-${filters.ficha_letra.trim().toUpperCase()}`
    whereAltas.num_de_ficha = ficha
  }

  // 🔎 UBICACION
  if (hasValue(filters.barrio)) {
    whereAltas.barrio = { [Op.iLike]: `%${filters.barrio.trim()}%` }
  }

  if (hasValue(filters.calle)) {
    whereAltas.calle = { [Op.iLike]: `%${filters.calle.trim()}%` }
  }

  // 🔎 PADRON COMPLETO
  if (
    hasValue(filters.distrito) &&
    hasValue(filters.zona) &&
    hasValue(filters.manzana) &&
    hasValue(filters.parcela)
  ) {
    whereAltas.distrito = filters.distrito
    whereAltas.zona = filters.zona
    whereAltas.manzana = filters.manzana
    whereAltas.parcela = filters.parcela
  }

  // 🔎 PROPIETARIO
  if (hasValue(filters.nombre)) {
    wherePropietario.nombre = {
      [Op.iLike]: `%${filters.nombre.trim()}%`
    }
  }

  if (hasValue(filters.apellido)) {
    wherePropietario.apellido = {
      [Op.iLike]: `%${filters.apellido.trim()}%`
    }
  }

  // 🔎 DESTINO
  if (hasValue(filters.tipo_destino)) {
    whereDestino.tipo_de_destino = {
      [Op.iLike]: `%${filters.tipo_destino.trim()}%`
    }
  }

  // 🔎 PLANO
  if (hasValue(filters.tipo_plano)) {
    wherePlano.tipo_plano = {
      [Op.iLike]: `%${filters.tipo_plano.trim()}%`
    }
  }

  // 🚨 VALIDAR QUE HAYA ALGÚN FILTRO REAL
  const hasFilters =
    Object.keys(whereAltas).length > 0 ||
    Object.keys(wherePropietario).length > 0 ||
    Object.keys(whereDestino).length > 0 ||
    Object.keys(wherePlano).length > 0

  if (!hasFilters) {
    throw new Error('Debe ingresar un criterio válido de búsqueda')
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