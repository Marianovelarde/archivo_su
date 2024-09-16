const {filterAndOrderServ} = require('./filtersAndOrderServ')

const filterAndOrderControllers = async (req,res) => {
    const {tipo_de_destino} = req.query

    try {
        const filters = {tipo_de_destino}

        const result = await filterAndOrderServ(filters)
        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron resultados' });
          }
        return res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error en el servidor'})
    }
}

module.exports = {
    filterAndOrderControllers
}