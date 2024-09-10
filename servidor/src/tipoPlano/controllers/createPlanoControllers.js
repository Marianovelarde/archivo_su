const {
    createPlanoService,
    getAllPlanosService,
    updatePlanoService
} = require('../service/tipoPlanoServices')

const createPlanoControllers = async (req,res) => {
    
    try {
        const {tipo_plano} = req.body
        
        if(!tipo_plano) {
            return res.status(400).json({error: 'tipo de destino es requerido'})
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
        return res.status(200).json({get_all_planos})
    } catch (error) {
        res.status(500).json({error: 'Error al recibir información de planos'})
    }
}
module.exports = {
    createPlanoControllers,
    updatePlanoControllers,
    getAllPlanosControllers
}