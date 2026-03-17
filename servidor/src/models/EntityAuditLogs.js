const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
 sequelize.define('entityAuditLogs', {
    id_audit: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    entity_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    performed_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    change: {
      type: DataTypes.JSON, 
    }
  })
}
