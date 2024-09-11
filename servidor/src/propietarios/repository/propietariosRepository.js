const {EntityPropietarios} = require('../../db')


const createPropietariosRepository = async (nombre,apellido,domicilio_postal, cuil, email) => {
    console.log('repository: ',nombre,apellido,domicilio_postal,cuil,email);
    
    const new_propietario = await EntityPropietarios.create(nombre,apellido,domicilio_postal,cuil,email)

    return new_propietario

};
/* 
    Crear un nuevo propietario: 
    {
        "nombre": "mariano",
        "apellido": "velarde",
        "domicilio_postal": "Cabo san diego",
        "cuil": 2303030303,
        "email": "suelourbano@gmail.com"
    }
*/
const updatePropietariosRepository = async (data, id_propietario) => {
  
    
        const update_propietario = await EntityPropietarios.update(data, {
            where: {
                id_propietario: id_propietario
            }
        })
        return update_propietario
};

const getAllPropietariosRepository = async () => {
    const get_propietarios = await EntityPropietarios.findAll()

    return get_propietarios
};
const deletePropietariosRepository = async (id_propietario) => {

    const delete_propietarios = await EntityPropietarios.destroy({
        where: {
            id_propietario: id_propietario
        }
    })
    return delete_propietarios
}

module.exports = {
    createPropietariosRepository,
    updatePropietariosRepository,
    getAllPropietariosRepository,
    deletePropietariosRepository
}

