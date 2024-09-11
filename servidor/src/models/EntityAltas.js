const {DataTypes} = require('sequelize');
//cambiar id_Altas por id_altas
module.exports = (sequelize) => {
    sequelize.define('entityAltas', {
        id_Altas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fecha_de_aprob: {
        type: DataTypes.DATE(),
    },
    num_de_exp: {
            type: DataTypes.STRING,
            allowNull: false
    },
    num_de_ficha: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_propietario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    distrito: {
        type: DataTypes.INTEGER
    },
    zona: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    manzana: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parcela: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    superficie_cubierta: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    final_de_obra: {
        type: DataTypes.DATE
    },
    id_destino: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_tipo_plano: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    direccion_tecnica: {
        type: DataTypes.STRING,
        allowNull: false
    },
    matricula_profesional: {
        type: DataTypes.INTEGER
    },
    fecha_archivo: {
        type: DataTypes.DATE
    }    
    },
    {
        paranoid: true,
        createdAt: 'createCharacteristic_at',
        updatedAt: 'modifiedCharacteristic_at',
        deletedAt: 'deleteCharacteristic_at'
    })
    }