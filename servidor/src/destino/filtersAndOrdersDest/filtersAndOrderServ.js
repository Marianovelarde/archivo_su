

const {EntityDestino} = require('../../db');

const {Op, where} = require('sequelize');


const filterAndOrderServ = async (filters,limit,offset,order) => {

    const { tipo_de_destino} = filters

    const whereClause = {}

    if(tipo_de_destino) {
        whereClause.tipo_de_destino = { [Op.iLike]: `%${tipo_de_destino}%`}
    }

const results = await EntityDestino.findAll({
    where: whereClause
})
return results
}

module.exports = {
    filterAndOrderServ
}