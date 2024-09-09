const {
    createDestinoService,
    getAllDestinosService
} = require('../services/destinoService')


const createDestinoControllers = async (req, res) => {
    try {
        const { tipo_de_destino } = req.body;
        console.log('Datos recibidos en la solicitud:', req.body);
        if (!tipo_de_destino) {
            return res.status(400).json({ error: 'tipo_de_destino es requerido' });
        }

        const nuevoDestino = await createDestinoService(tipo_de_destino); 
        return res.status(200).json(nuevoDestino);
    } catch (error) {
        console.error('Error en controlador:', error);
        return res.status(500).json({ error: 'Error al crear destino' });
    }
};

const getAllDestinoControllers = async (req,res) => {
    try {
        const getDestino = await getAllDestinosService()
        return res.status(201).json({getDestino})
    } catch (error) {
        return res.status(500).json({error: 'error al obtener la información sobre destinos'})
    }
}

module.exports = {
    createDestinoControllers,
    getAllDestinoControllers
}