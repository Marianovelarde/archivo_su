const {EntityPropietarios} = require('../../db')


const createPropietariosRepository = async (nombre,apellido,domicilio_postal, cuil, email) => {
    console.log('repository: ',nombre,apellido,domicilio_postal,cuil,email);
    
    const new_propietario = await EntityPropietarios.create(nombre,apellido,domicilio_postal,cuil,email)

    return new_propietario

};

const updatePropietariosRepository = async (data, id_propietarios) => {
    console.log('repository data: ', data);
    console.log('id en repository: ', id_propietarios);
    
    
        const update_propietario = await EntityPropietarios.update(data, {
            where: {
                id_propietario: id_propietarios
            }
        })
        return update_propietario
};

const getAllPropietariosRepository = async () => {
    const getPropietarios = await EntityPropietarios.findAll()

    return getPropietarios
};

module.exports = {
    createPropietariosRepository,
    updatePropietariosRepository,
    getAllPropietariosRepository
}

