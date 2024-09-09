const {EntityDestino} = require('../../db')


const createDestinoRepositories = async (tipo_de_destino) => {
    console.log('repositorio: ', tipo_de_destino);
    
        const newDestino = await EntityDestino.create(tipo_de_destino)        
        return newDestino
}

module.exports = {
    createDestinoRepositories
}