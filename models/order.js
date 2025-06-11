'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsToMany(models.Product, {
        through: models.OrderProduct, // Name of the junction table
        foreignKey: { name: 'orderId', type: DataTypes.UUID }, // The foreign key in the junction table that points to the Order
        otherKey: { name: 'productId', type: DataTypes.UUID }, // The foreign key in the junction table that points to the Product
      });
      Order.belongsTo(models.Customer, {
        foreignKey: { name: 'customerId', type: DataTypes.UUID }, // The foreign key that refers to the Customer model
      });
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      orderStatus: {
        type: DataTypes.ENUM(
          'Added To Cart',
          'Ordered',
          'Shipped',
          'Delivered'
        ),
        allowNull: false,
        defaultValue: 'Added To Cart',
      },
      customerId: {
        type: DataTypes.UUID,
        allowNull: false, // Ensures that every Order must belong to a Customer
        references: {
          model: 'Customers', // Reference the 'Customers' table
          key: 'id', // Reference the 'id' column of Customers
        },
        onDelete: 'CASCADE', // Optional: If the customer is deleted, their orders will be deleted as well
      },
      address: {
        type: DataTypes.STRING(512),
        allowNull: false,
      },
      deliveryInstructions: {
        type: DataTypes.STRING(512),
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
