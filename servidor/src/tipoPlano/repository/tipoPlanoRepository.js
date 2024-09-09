const {EntityPlano} = require('../../db')

const createPlanoRepository = async (tipo_plano) => {
    
    const new_plano = await EntityPlano.create(tipo_plano)
    return new_plano
};

const getAllPlanosRepository = async () => {
    const get_all_planos = await EntityPlano.findAll()
    return get_all_planos
}

module.exports = {
    createPlanoRepository,
    getAllPlanosRepository
}