const {
    createPlanoService,
    getAllPlanosService,
    updatePlanoService,
    deletePlanosService
} = require('../service/tipoPlanoServices')

const createPlanoControllers = async (req,res) => {
    
    try {
        const {tipo_plano} = req.body
        
        if(!tipo_plano) {
            return res.status(400).json({error: 'tipo de plano es requerido'})
        }
        const new_plano = await createPlanoService(tipo_plano)
        return res.status(201).json(new_plano)
    } catch (error) {
        console.error('error en controllers: ', error)
        return res.status(500).json({error: 'Error al crear un tipo dep plano'})
    }
};
const updatePlanoControllers = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body
        const update_plano = await updatePlanoService(data, id)
        return res.status(200).json({message: 'Se ha modificado tipo de plano con éxito', update_plano})
    } catch (error) {
        console.error('error en controllers: ', error.message)
        res.status(500).json({error: 'Error en controllers'})
    }
}

const getAllPlanosControllers = async (req,res) => {
    try {
        const get_all_planos = await getAllPlanosService()
        if(!get_all_planos.length) {
            return res.status(200).send('No hay tipos de planos registrado')
        }
        
        return res.status(200).json({get_all_planos})
    } catch (error) {
        res.status(500).json({error: 'Error al recibir información de planos'})
    }
}

const deletePlanosControllers = async (req,res) => {
    try {
        const {id} = req.params

        const delete_planos = await deletePlanosService(id)
      
        return res.status(200).json({message: 'Tipo de plano eliminado con éxito', delete_planos})
    } catch (error) {
        console.error('Error en controllers: ', error)
        res.status(500).json({error: 'error al eliminar el tipo de plano'})
    }
}
module.exports = {
    createPlanoControllers,
    updatePlanoControllers,
    getAllPlanosControllers,
    deletePlanosControllers
}