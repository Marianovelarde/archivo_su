const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
 sequelize.define('entityAuditLog', {
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    performed_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    target_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
    },
  })
}
