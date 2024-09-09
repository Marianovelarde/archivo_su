const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('entityPropietarios', {
        id_propietario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        domicilio_postal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cuil: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING
        }
    })
}