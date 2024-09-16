
const {EntityAltas} = require('../../db');
const {Op} = require('sequelize')

const filtersAndOrderServ = async (filters, limit, offset, order) => {
    const {
        ubicacion,
        fecha_de_aprob,
        num_de_exp,
        num_de_ficha,
        distrito,
        zona,
        manzana
      } = filters;
    
      const whereClause = {};
    
      // Agregar condiciones según los filtros
      if (ubicacion) {
        whereClause.ubicacion = { [Op.iLike]: `%${ubicacion}%` };  // ILIKE para no diferenciar mayúsculas/minúsculas
      }
    
      if (fecha_de_aprob) {
        whereClause.fecha_de_aprob = fecha_de_aprob;  // Puede necesitar un formato específico
      }
    
      if (num_de_exp) {
        whereClause.num_de_exp = { [Op.iLike]: `%${num_de_exp}%` };  // ILIKE para buscar parcialmente
      }
    
      if (num_de_ficha) {
        whereClause.num_de_ficha = num_de_ficha;  // Exacto si se trata de números
      }
    
      if (distrito) {
        whereClause.distrito = distrito;
      }
    
      if (zona) {
        whereClause.zona = zona;
      }
    
      if (manzana) {
        whereClause.manzana = manzana;
      }
    
      // Realizar la consulta en la base de datos
      const results = await EntityAltas.findAll({ where: whereClause });
    
      return results;
}

module.exports = {
    filtersAndOrderServ}
