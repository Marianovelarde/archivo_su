const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
// models/EntityPlanoArchivo.j

  sequelize.define('entityPlanoArchivo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}