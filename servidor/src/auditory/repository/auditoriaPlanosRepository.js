// src/repository/auditoriaPlanosRepository.js



const { EntityAuditoriaPlanos, EntityUser, EntityPlanoArchivo, EntityAltas } = require('../../db')

const createAuditoriaPlanoRepository = async (data) => {

  const auditoria = await EntityAuditoriaPlanos.create(data)

  return auditoria
}

const getAuditoriaPlanoRepository = async () => {

  const auditoria = await EntityAuditoriaPlanos.findAll({
    include: [{

            model: EntityUser,
        attributes: ['username'],
    },
    {
        model: EntityPlanoArchivo,
        attributes: ['nombre']
    },
    {
        model: EntityAltas,
        attributes: ['num_de_ficha']
    }
    
    ]
  })

  return auditoria
}

module.exports = {
  createAuditoriaPlanoRepository,
  getAuditoriaPlanoRepository
}