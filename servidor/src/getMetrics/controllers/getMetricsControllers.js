const {getMetricsService} = require('../service/getMetricsService');

const getMetricsController = async (req, res) => {

    try {
        const metrics = await getMetricsService()
        return res.status(200).json(metrics)
    } catch (error) {
        return res.status(500).jsonn({message: 'Error al obtener las métricas', error: error.message})
    }
}
module.exports = { getMetricsController }

