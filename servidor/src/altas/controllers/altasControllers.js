const { EntityPlanoArchivo } = require('../../db')

const {
    createAltaService,
    getAltasService,
    updateAltasService,
    deleteAltasService,
getAltaByIdService} = require('../service/altaService')


const createAltaControllers = async (req, res) => {
  try {

    const files = req.files // 🔥 múltiples archivos

    const {
      fecha_de_aprob,
      num_de_exp,
      num_de_ficha,
      id_propietario,
      barrio,
      calle,
      distrito,
      zona,
      manzana,
      parcela,
      superficie_cubierta,
      final_de_obra,
      id_destino,
      id_tipo_plano,
      direccion_tecnica,
      matricula_profesional,
      fecha_archivo,
      observaciones,
      permiso_de_obra
    } = req.body

    // 🔥 ya NO guardamos plano en entityAltas
    const new_alta = await createAltaService({
      fecha_de_aprob,
      num_de_exp,
      num_de_ficha,
      id_propietario,
      barrio,
      calle,
      distrito,
      zona,
      manzana,
      parcela,
      superficie_cubierta,
      final_de_obra,
      id_destino,
      id_tipo_plano,
      direccion_tecnica,
      matricula_profesional,
      fecha_archivo,
      observaciones,
      permiso_de_obra
    })

    // 🔥 GUARDAR MÚLTIPLES PLANOS
    if (files && files.length > 0) {

      const planos = files.map(file => ({
        id_alta: new_alta.id_Altas,
        path: file.path,
        nombre: file.originalname
      }))

      await EntityPlanoArchivo.bulkCreate(planos)
    }


    return res.status(201).json(new_alta)

  } catch (error) {

    console.error('Error en controllers:', error)

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'La ficha ya existe' })
    }

    if (error.parent?.code === '23505') {
      return res.status(400).json({ error: 'La ficha ya existe' })
    }

    if (error.status === 400) {
      return res.status(400).json({ error: error.message })
    }

    return res.status(500).json({
      error: 'Error al crear alta'
    })
  }
}



const updateAltaControllers = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    // 🔥 1. actualizar datos
    const update_altas = await updateAltasService(id, data)

    // 🔥 2. guardar archivos (CORREGIDO)
    if (req.files && req.files.length > 0) {
      const planos = req.files.map(file => ({
        path: file.path,
        id_alta: id,
        nombre: file.originalname // ✅ FIX
      }))

      await EntityPlanoArchivo.bulkCreate(planos)
    }

    return res.status(200).json({
      message: 'Alta modificada con éxito',
      update_altas
    })

  } catch (error) {
    console.error('error en controllers: ', error)

    return res.status(500).json({
      error: 'Error al actualizar alta',
      error_details: error.message
    })
  }
}
const getAltasControllers = async (req,res) => {
    try {
        const new_alta = await getAltasService()
        if(!new_alta.length) {
            return res.status(200).send('No hay altas creadas ')
        }
        return res.status(200).json({new_alta})
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener las altas' });
    }
};

const getAltaByIdController = async (req, res) => {
    try {
      const { id } = req.params
      const alta = await getAltaByIdService(id)
  
      return res.status(200).json(alta)
    } catch (error) {
      return res.status(404).json({ error: error.message })
    }
  }

const deleteAltasControllers = async (req,res) => {
    try {
        const {id} = req.params;
        const delete_altas = await deleteAltasService(id)
        return res.status(200).json({message: 'Alta eliminada con éxito', delete_altas})
    } catch (error) {
        res.status(500).json({error: 'Error al intentar eliminar.'})
    }
}
module.exports = {
    createAltaControllers,
    getAltasControllers,
    updateAltaControllers,
    deleteAltasControllers,
    getAltaByIdController
}