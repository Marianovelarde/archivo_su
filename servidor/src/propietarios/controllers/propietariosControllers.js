const {
    createPropietariosService,
    getAllPropietariosService,
    updatePropietariosService,
    deletePropietariosService
} = require('../service/propietariosService')

const createPropietariosControllers = async (req,res) => {

    try {
        const { nombre, apellido, domicilio_postal, cuil, email } = req.body;
        
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

const updatePropietariosControllers = async (req,res) => {
    try {
        const {id} = req.params;
        const data = req.body

        
        
        const update_propietario = await updatePropietariosService(data, id)
        return res.status(200).json({message: 'Propietario modificado con éxito', update_propietario})
    } catch (error) {
        console.error('Error en controllers: ', error.message)
        res.status(500).json({error: 'Error al procesar datos en controllers'})
    }
}
const getAllPropietariosControllers = async (req, res) => {
    try {
        const get_propietarios = await getAllPropietariosService()
        if(!get_propietarios.length) {
            return res.status(200).send('no hay propietarios registrados')
        }
        return res.status(200).json({get_propietarios})
    } catch (error) {
        return res.status(500).json({error: 'Error al mostrar los propietarios'})
    }
};

const deletePropietariosControllers = async (req,res) => {
    try {
        const {id} = req.params
        const delete_propietarios = await deletePropietariosService(id)
        return res.status(200).json({message: 'El propietario fue eliminado con éxito', delete_propietarios})
    } catch (error) {
        res.status(500).json({error: 'Error al intentar eliminar un propietario'})
    }
};

module.exports = {
    createPropietariosControllers,
    updatePropietariosControllers,
    getAllPropietariosControllers,
    deletePropietariosControllers
}
