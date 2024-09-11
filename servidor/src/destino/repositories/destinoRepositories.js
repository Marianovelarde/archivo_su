const {EntityDestino} = require('../../db')


const createDestinoRepositories = async (tipo_de_destino) => {
    
        const new_destino = await EntityDestino.create(tipo_de_destino)        
        return new_destino
};
/*
    crear destino:
    {
    tipo_de_destino: "Estacionamiento"
    }
*/
const updateDestinoRepository = async (data, id_destino) => {
    const update_destino = await EntityDestino.update(data, {
        where: {
            id_destino: id_destino
        }
    })
    return update_destino
};

const getAllDestinosRepository = async () => {
    const get_destino = await EntityDestino.findAll()
    return get_destino
}

const deleteDestinosRepository = async (id_destino) => {
    const delete_destino = await EntityDestino.destroy({
        where: {
            id_destino: id_destino
        }
    })
    return delete_destino
}


module.exports = {
    createDestinoRepositories,
    getAllDestinosRepository,
    updateDestinoRepository,
    deleteDestinosRepository
}