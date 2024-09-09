const {
    createPropietariosService,
    getAllPropietariosService
} = require('../service/propietariosService')

const createPropietariosControllers = async (req,res) => {

    try {
        const { nombre, apellido, domicilio_postal, cuil, email } = req.body;
        console.log('Controller Data:', req.body);
        
        if (!nombre || !apellido || !domicilio_postal || !cuil || !email) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const new_propietario = await createPropietariosService({nombre,apellido,domicilio_postal,cuil,email})

        return res.status(201).json(new_propietario)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Error al crear un propietario'})
    }

};
const getAllPropietariosControllers = async (req, res) => {
    try {
        const getPropietarios = await getAllPropietariosService()
        return res.status(200).json({getPropietarios})
    } catch (error) {
        return res.status(500).json({error: 'Error al mostrar los propietarios'})
    }
}

module.exports = {
    createPropietariosControllers,
    getAllPropietariosControllers
}
