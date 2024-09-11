const {EntityPlano} = require('../../db')

const createPlanoRepository = async (tipo_plano) => {
    
    const new_plano = await EntityPlano.create(tipo_plano)
    return new_plano
};

const updatePlanoRepository = async (data, id_tipo_plano ) => {

    const update_plano = await EntityPlano.update(data, {
        where: {
            id_tipo_plano: id_tipo_plano
        }
    })
    return update_plano
}
const getAllPlanosRepository = async () => {
    const get_all_planos = await EntityPlano.findAll()
    return get_all_planos
};

const deletePlanosRepository = async (id_tipo_plano) => {
    const delete_planos = await EntityPlano.destroy({
        where: {
            id_tipo_plano
        }
    })
    return delete_planos
}

module.exports = {
    createPlanoRepository,
    updatePlanoRepository,
    getAllPlanosRepository,
    deletePlanosRepository
}