'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderProducts', {
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Orders', // references the 'Orders' table
          key: 'id',
        },
        onDelete: 'CASCADE', // optional: cascade delete if an order is deleted
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Products', // references the 'Products' table
          key: 'id',
        },
        onDelete: 'CASCADE', // optional: cascade delete if a product is deleted
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1, // You can add quantity to track how many of this product are in the order
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderProducts');
  },
};
