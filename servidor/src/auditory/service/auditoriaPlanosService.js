// src/service/auditoriaPlanosService.js

const {
  createAuditoriaPlanoRepository,
  getAuditoriaPlanoRepository
} = require('../repository/auditoriaPlanosRepository')

const createAuditoriaPlanoService = async (data) => {

  return await createAuditoriaPlanoRepository(data)

}

const getAuditoriaPlanoService = async () => {

  return await getAuditoriaPlanoRepository()

}

module.exports = {
  createAuditoriaPlanoService,
  getAuditoriaPlanoService
}