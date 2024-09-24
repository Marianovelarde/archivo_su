const {filterAndOrderServ} = require('./filtersAndOrderServ')

const filtersAndOrderControllers = async (req,res) => {
    const {tipo_plano} = req.query;
    try {
        const filters = {tipo_plano}

        const result = await filterAndOrderServ(filters)
        if(result.length === 0) {
            return res.status(404).json({message: 'No se encontraron resultados'})
        }
        return res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error en el servidor'})
    }
}

module.exports = {
    filtersAndOrderControllers
}