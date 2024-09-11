const {
    createDestinoService,
    getAllDestinosService,
    updateDestinoService,
    deleteDestinoService
} = require('../services/destinoService')


const createDestinoControllers = async (req, res) => {
    try {
        const { tipo_de_destino } = req.body;
        if (!tipo_de_destino) {
            return res.status(400).json({ error: 'tipo_de_destino es requerido' });
        }

        const new_destino = await createDestinoService(tipo_de_destino); 
        return res.status(200).json(new_destino);
    } catch (error) {
        console.error('Error en controlador:', error);
        return res.status(500).json({ error: 'Error al crear destino' });
    }
};

const updateDestinoControllers = async (req,res) => {
    try {
        const {id} = req.params
        const data = req.body

        const update_destino = await updateDestinoService(data,id)
        return res.status(200).json({message: 'Destino modificado con éxito', update_destino})
    } catch (error) {
        console.error('error en controllers: ', error.message)
    }
}
const getAllDestinoControllers = async (req,res) => {
    try {
        const get_destino = await getAllDestinosService()
        if(!get_destino.length) {
            return res.status(200).send('No hay tipo de destino registrado')
        }
        return res.status(201).json({get_destino})
    } catch (error) {
        return res.status(500).json({error: 'error al obtener la información sobre destinos'})
    }
};

const deleteDestinoControllers = async (req, res) => {
    try {
        const {id} = req.params

        const delete_destino = await deleteDestinoService(id)
   
        return res.status(200).json({message: 'El tipo de destino fue eliminado ', delete_destino})
    } catch (error) {
        res.status(500).json({message: 'No se pudo eliminar el tipo de destino'})
    }
}

module.exports = {
    createDestinoControllers,
    updateDestinoControllers,
    getAllDestinoControllers,
    deleteDestinoControllers
}