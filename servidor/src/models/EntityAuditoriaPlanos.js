

const {DataTypes} = require('sequelize');

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
        ip: {
            type: DataTypes.STRING,
        },
fecha_acceso: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
}

    })
}