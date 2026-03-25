const {EntityAltas, EntityPlano, EntityPropietarios, EntityDestino, EntityPlanoArchivo} = require('../../db')

const createAltaRepository = async (data) => {

    const alta =  EntityAltas.create(data)

    return alta
};
//Altas:
/*
{
  "fecha_de_aprob": "2024-09-08",
  "num_de_exp": "EXP123456",
  "num_de_ficha": 101,
  "id_propietario": 1,
  "ubicacion": "Ubicación ejemplo",
  "distrito": 1,
  "zona": 2,
  "manzana": 3,
  "parcela": 4,
  "superficie_cubierta": 150.5,
  "final_de_obra": "2024-09-08",
  "id_destino": 2,
  "id_tipo_plano": 2,
  "direccion_tecnica": "Ingeniero Ejemplo",
  "matricula_profesional": 987654
}

*/
const updateAltaRepository = async (id_alta,data) => {
    const update_alta = await EntityAltas.update(data, {
        where: {
            id_Altas: id_alta
        }
    })
    return update_alta
}

const getAltasRepository = async () => {
    
    const get_Altas = await EntityAltas.findAll({
        include: [
            {
                model: EntityPropietarios,
                as: 'propietario' ,
                attributes: ['nombre', 'apellido'],
            },
            {
                model: EntityDestino,
                attributes: ['tipo_de_destino']
            },
            {
                model: EntityPlano,
                attributes: ['tipo_plano']
            },
            {
                model: EntityPlanoArchivo,
                as: 'planos',
                attributes: ['id', 'path', 'nombre']
            }
        ]
    }) 
    return get_Altas
};
const getAltaByIdRepository = async (id_Altas) => {
    const alta = await EntityAltas.findOne({
      where: { id_Altas },
      include: [
        {
          model: EntityPropietarios,
          as: 'propietario',
          attributes: ['nombre', 'apellido', 'domicilio_postal', 'cuil', 'email'],
        },
        {
          model: EntityDestino,
          attributes: ['tipo_de_destino']
        },
           {
          model: EntityPlanoArchivo,
          as: 'planos',
          attributes: ['id', 'path', 'nombre']
        },
        {
          model: EntityPlano,
          attributes: ['tipo_plano']
        }
     
      ]
    })
  
    return alta
  }
  

const deleteAltasRepository = async (id_Altas) => {

    const delete_altas = await EntityAltas.destroy({
        where: {
            id_Altas: id_Altas
        }
    })
    return delete_altas

};
module.exports = {
    createAltaRepository,
    getAltasRepository,
    updateAltaRepository,
    deleteAltasRepository,
    getAltaByIdRepository
}