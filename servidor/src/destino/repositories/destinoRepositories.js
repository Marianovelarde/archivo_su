const {EntityDestino} = require('../../db')


const createDestinoRepositories = async (tipo_de_destino) => {
    console.log('repositorio: ', tipo_de_destino);
    
        const newDestino = await EntityDestino.create(tipo_de_destino)        
        return newDestino
}

const getAllDestinosRepository = async () => {
    const getDestinos = await EntityDestino.findAll()
    return getDestinos
}


module.exports = {
    createDestinoRepositories,
    getAllDestinosRepository
}