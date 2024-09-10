const {EntityAltas, EntityPlano, EntityPropietarios, EntityDestino} = require('../../db')

const createAltaRepository = async (data) => {

    const alta =  EntityAltas.create(data)

    return alta
};

const updateAltaRepository = async (id_alta,data) => {
    const update_alta = await EntityAltas.update(data, {
        where: {
            id_Altas: id_alta
        }
    })
    return update_alta
}

const getAltasRepository = async () => {
    
    const verAltas = await EntityAltas.findAll({
        include: [
            {
                model: EntityPropietarios,
                attributes: ['nombre', 'apellido'] 
            },
            {
                model: EntityDestino,
                attributes: ['tipo_de_destino']
            },
            {
                model: EntityPlano,
                attributes: ['tipo_plano']
            }
        ]
    }) 
    return verAltas
}
module.exports = {
    createAltaRepository,
    getAltasRepository,
    updateAltaRepository
}