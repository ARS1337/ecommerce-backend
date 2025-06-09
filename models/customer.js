'use strict';
const { Model } = require('sequelize');
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
      details: {
        type: DataTypes.JSON, // Using the JSON type for details
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Customer',
    }
  );
  return Customer;
};
