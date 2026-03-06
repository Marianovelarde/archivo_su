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
            allowNull: false,
            unique: true
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        role: {
            type: DataTypes.ENUM(
                'super_admin',
                'editor',
                'visor',
                'consulta'
            )
        },
        isActived: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
              mustChangePassword: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
        paranoid: true,
        createdBy: 'createdUser_by',
        updatedBy: 'modifiedUser_by',
        deletedBy: 'deletedUser_by',
        createdAt: 'createdUser_at',
        updatedAt: 'modifiedUser_at',
        deletedAt: 'deletedUser_at'
    })
}