'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order, {
        foreignKey: { name: 'customerId', type: DataTypes.UUID }, // Foreign key in the Orders table that refers to Customer
      });
    }
  }
  Customer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('CUSTOMER', 'ADMIN'),
        defaultValue: 'CUSTOMER',
      },
      details: {
        type: DataTypes.JSON, // Using the JSON type for details
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Customer',
      hooks: {
        beforeSave: async (customer) => {
          if (customer.changed('password')) {
            customer.password = await bcrypt.hash(customer.password, 8);
          }
        },
      },
    }
  );
  return Customer;
};
