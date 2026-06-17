const {EntityAuditoriaPlanos, EntityUser, EntityAltas, EntityPlanoArchivo} = require('../db')

const createAuditoriaPlanoRepository = async (data) => {
    const auditoria = await EntityAuditoriaPlanos.create(data)

    return auditoria
}

const getAuditoriaPlanosRepository = async () => {

    const auditorias = await EntityAuditoriaPlanos.findAll({

    include: [

        {
            model: EntityUser,
            attributes: ['usuario']
        },

        {
            model: EntityPlanoArchivo,
            attributes: ['nombre']
        },

        {
            model: EntityAltas,
            attributes: ['num_de_ficha']
        }

    ],

    order: [['fecha_acceso', 'DESC']]

})
    return auditorias
}

module.exports = {
    createAuditoriaPlanoRepository,
    getAuditoriaPlanosRepository
}