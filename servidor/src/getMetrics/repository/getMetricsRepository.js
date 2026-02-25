const {EntityAltas, EntityPropietarios} = require('../../db')
const {fn, col} = require('sequelize')

const getMetricsRepository = async () => {
    
    // Obtener el total de altas
    const totalAltas = await EntityAltas.count()
    // altas por barrio
    const altasPorBarrio = await EntityAltas.findAll({
    attributes: [
      'barrio',
      [fn('COUNT', col('id_Altas')), 'cantidad']
    ],
    group: ['barrio'],
    order: [[fn('COUNT', col('id_Altas')), 'DESC']]
  })
  // altas por apellido
const altasPorApellido = await EntityAltas.findAll({
  attributes: [
    [fn('COUNT', col('EntityAltas.id_Altas')), 'cantidad']
  ],
  include: [{
    model: EntityPropietarios,
    attributes: ['apellido']
  }],
  group: ['EntityPropietario.apellido'],
})

//altas por superficie
const altasPorSuperficie = await EntityAltas.findAll({
    attributes: [
      'superficie',
      [fn('COUNT', col('id_Altas')), 'cantidad']
    ],
    group: ['superficie'],
    order: [[fn('COUNT', col('id_Altas')), 'DESC']]
  })
}




module.exports = { getMetricsRepository }
