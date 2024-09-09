const {createAltaService} = require('../service/altaService')

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
}

module.exports = {
    createAltaControllers
}