// models/orderProduct.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define(
    'OrderProduct',
    {
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: 'OrderProducts',
      timestamps: true, // Enables createdAt and updatedAt
    }
  );

  return OrderProduct;
};
