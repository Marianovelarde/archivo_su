const {EntityAltas} = require('../../db')

const createAltaRepository = async (data) => {

    const alta =  EntityAltas.create(data)

    return alta
}

module.exports = {
    createAltaRepository
}