const {EntityDestino} = require('../../db')


const createDestinoRepositories = async (tipo_de_destino) => {
    console.log('repositorio: ', tipo_de_destino);
    
        const newDestino = await EntityDestino.create(tipo_de_destino)        
        return newDestino
};
const updateDestinoRepository = async (data, id_destino) => {
    const update_destino = await EntityDestino.update(data, {
        where: {
            id_destino: id_destino
        }
    })
    return update_destino
};

const getAllDestinosRepository = async () => {
    const getDestinos = await EntityDestino.findAll()
    return getDestinos
}


module.exports = {
    createDestinoRepositories,
    getAllDestinosRepository,
    updateDestinoRepository
}