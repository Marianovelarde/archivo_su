const {filtersAndOrderServ} = require('./filtersAndOrderServ')

const filterAndOrderControllers = async (req,res) => {
    const { ubicacion, fecha_de_aprob, num_de_exp, num_de_ficha, distrito, zona, manzana } = req.query;

    try {
      const filters = { ubicacion, fecha_de_aprob, num_de_exp, num_de_ficha, distrito, zona, manzana };
  
      // Llamar al servicio que maneja el filtrado
      const results = await filtersAndOrderServ(filters);
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No se encontraron resultados' });
      }
  
      return res.status(200).json(results);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
}

module.exports = {
    filterAndOrderControllers
}