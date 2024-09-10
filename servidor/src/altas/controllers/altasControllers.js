const {
    createAltaService,
    getAltasService,
    updateAltasService} = require('../service/altaService')

const createAltaControllers = async (req,res) => {

    try {
        const {
            fecha_de_aprob,
            num_de_exp,
            num_de_ficha,
            id_propietario,
            ubicacion,
            distrito,
            zona,
            manzana,
            parcela,
            superficie_cubierta,
            final_de_obra,
            id_destino,
            id_tipo_plano,
            direccion_tecnica,
            matricula_profesional
        } = req.body

        const newAlta = await createAltaService({
            fecha_de_aprob,
            num_de_exp,
            num_de_ficha,
            id_propietario,
            ubicacion,
            distrito,
            zona,
            manzana,
            parcela,
            superficie_cubierta,
            final_de_obra,
            id_destino,
            id_tipo_plano,
            direccion_tecnica,
            matricula_profesional
        })
        return res.status(201).json(newAlta)
    } catch (error) {
        console.error('Error en controllers: ', error)
        return res.status(500).json({ error: 'Error al crear alta' });
    }
};

const updateAltaControllers = async (req,res) => {
    try {
            const {id} = req.params;
            const data = req.body
            console.log('params: ', id);
            console.log('body:', data);
            
            

            const update_altas = await updateAltasService(id, data)
            return res.status(200).json({message: 'Alta modificada con éxito', update_altas})
    } catch (error) {
        
        console.error('error en controllers: ', error)
        return res.status(500).json({error: 'Error al actualizar alta'})
    }
}
const getAltasControllers = async (req,res) => {
    try {
        const new_alta = await getAltasService()
        return res.status(200).json({new_alta})
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener las altas' });
    }
}
module.exports = {
    createAltaControllers,
    getAltasControllers,
    updateAltaControllers
}