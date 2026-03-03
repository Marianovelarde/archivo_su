const { getMetricsRepository } = require('../repository/getMetricsRepository')

const getMetricsService = async () => {
  return await getMetricsRepository()
}

module.exports = { getMetricsService }