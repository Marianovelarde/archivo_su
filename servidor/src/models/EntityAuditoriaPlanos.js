// EntityAuditoriaPlanos.js


const {DataTypes} = require('sequelize')



module.exports = (sequelize) => {
  sequelize.define('EntityAuditoriaPlanos', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    id_plano: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    id_alta: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    fecha_acceso: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    ip: {
      type: DataTypes.STRING
    }

  })
}