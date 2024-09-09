const {EntityPlano} = require('../../db')

const createPlanoRepository = async (tipo_plano) => {
    
    const new_plano = await EntityPlano.create(tipo_plano)
    return new_plano
}

module.exports = {
    createPlanoRepository
}