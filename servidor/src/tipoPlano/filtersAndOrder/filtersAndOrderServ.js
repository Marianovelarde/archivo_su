const {EntityPlano} = require('../../db');

const {Op, where} = require('sequelize')

const filterAndOrderServ = async (filters) => {
    const {tipo_plano} = filters

    const whereClause = {};

if(tipo_plano) {
    whereClause.tipo_plano = {[Op.iLike]: `%${tipo_plano}%`}
}

const result = await EntityPlano.findAll({
    where: whereClause
})
return result
}


module.exports = {
    filterAndOrderServ
}