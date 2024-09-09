const {EntityPropietarios} = require('../../db')


const createPropietariosRepository = async (nombre,apellido,domicilio_postal, cuil, email) => {
    console.log('repository: ',nombre,apellido,domicilio_postal,cuil,email);
    
    const new_propietario = await EntityPropietarios.create(nombre,apellido,domicilio_postal,cuil,email)

    return new_propietario

}

module.exports = {
    createPropietariosRepository
}

