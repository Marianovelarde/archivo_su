const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('entityDestino', {
        id_destino: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tipo_de_destino: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}