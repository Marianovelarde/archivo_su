const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'entityDocument',
    {
      id_document: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      // Relación con ficha / alta
      id_alta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      file_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      file_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      mime_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      file_size: {
        type: DataTypes.INTEGER,
      },

      document_type: {
        type: DataTypes.STRING,
        allowNull: false,
        // ej: plano_aprobado, conforme_obra, relevamiento
      },

      uploaded_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      createdAt: 'createdDocument_at',
      updatedAt: 'modifiedDocument_at',
      deletedAt: 'deletedDocument_at',
    }
  )
}
