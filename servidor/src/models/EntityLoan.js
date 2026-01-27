const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'entityLoan',
    {
      id_loan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      id_document: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      loan_to_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      loan_to_type: {
        type: DataTypes.ENUM('CONTRIBUYENTE', 'EMPLEADO'),
        allowNull: false,
      },

      loan_to_dni: {
        type: DataTypes.STRING,
      },

      loan_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      expected_return_date: {
        type: DataTypes.DATE,
      },

      return_date: {
        type: DataTypes.DATE,
      },

      status: {
        type: DataTypes.ENUM('PRESTADO', 'DEVUELTO'),
        defaultValue: 'PRESTADO',
      },

      observations: {
        type: DataTypes.TEXT,
      },

      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      createdAt: 'createdLoan_at',
      updatedAt: 'modifiedLoan_at',
      deletedAt: 'deletedLoan_at',
    }
  )
}
