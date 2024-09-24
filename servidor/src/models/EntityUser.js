const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('entityUser', {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tokenAuth: {
            type: DataTypes.STRING(300),
            allowNull: true,
            defaultValue: null
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isActived: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        paranoid: true,
        createdAt: 'createdUser_at',
        updatedAt: 'modifiedUser_at',
        deletedAt: 'deletedUser_at'
    })
}