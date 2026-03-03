const { EntityAltas, EntityPropietarios } = require('../../db')
const { fn, col } = require('sequelize')

const getMetricsRepository = async () => {

  const totalAltas = await EntityAltas.count()

  const altasPorBarrio = await EntityAltas.findAll({
    attributes: [
      'barrio',
      [fn('COUNT', col('id_Altas')), 'cantidad']
    ],
    group: ['barrio'],
    order: [[fn('COUNT', col('id_Altas')), 'DESC']]
  })

const altasPorApellido = await EntityAltas.findAll({
  attributes: [
    [fn('COUNT', col('id_Altas')), 'cantidad'],
    [col('propietario.apellido'), 'apellido']
  ],
  include: [{
    model: EntityPropietarios,
    as: 'propietario',
    attributes: []
  }],
  group: [col('propietario.apellido')],
  raw: true
})

  return {
    totalAltas,
    altasPorBarrio,
    altasPorApellido
  }
}

module.exports = { getMetricsRepository }