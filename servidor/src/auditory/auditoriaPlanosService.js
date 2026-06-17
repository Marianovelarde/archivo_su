const {
  createAuditoriaPlanoRepository,
  getAuditoriaPlanosRepository
} = require('./auditoriaPlanosRepository')

const createAuditoriaPlanoService = async (data) => {

  return await createAuditoriaPlanoRepository(data)

}

const getAuditoriaPlanoService = async () => {

  return await getAuditoriaPlanosRepository()

}

module.exports = {
  createAuditoriaPlanoService,
  getAuditoriaPlanoService
}