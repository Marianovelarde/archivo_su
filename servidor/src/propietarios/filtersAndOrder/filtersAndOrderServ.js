const {EntityPropietarios} = require('../../db')

const {Op, where} = require('sequelize');

const filterAndOrderServ = async (filters) => {
    const {nombre, apellido, domicilio_postal, cuil, email } = filters

    const whereClause = {}

    if(nombre) {
        whereClause.nombre = { [Op.iLike]: `%${nombre}%`}
    }
    
    if(apellido) {
        whereClause.apellido = { [Op.iLike]: `%${apellido}%`}
    }
    if(domicilio_postal) {
        whereClause.domicilio_postal = { [Op.iLike]: `%${domicilio_postal}%`}
    }
    if(cuil) {
        whereClause.cuil = cuil
    }
    if(email) {
        whereClause.email = {[Op.iLike]: `%${email}%`}
    }

    const results = await EntityPropietarios.findAll({
        where: whereClause
    })
    return results
}

module.exports = {
    filterAndOrderServ
}