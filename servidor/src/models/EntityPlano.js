const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('entityPlano', {
        id_tipo_plano: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tipo_plano: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}