const {
    createDestinoRepositories
} = require('../repositories/destinoRepositories')

const createDestinoService = async (tipo_de_destino) => {
    try {
        return await createDestinoRepositories({tipo_de_destino});
    } catch (error) {
        console.error('Error en servicio:', error);
        throw error;
    }
};

module.exports = {
    createDestinoService
}