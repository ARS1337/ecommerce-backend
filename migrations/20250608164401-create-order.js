'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      customerId: {
        type: Sequelize.UUID,
        allowNull: false, // Ensures every order must belong to a Customer
        references: {
          model: 'Customers', // The table name for the Customer model
          key: 'id', // The primary key of the Customer table
        },
        onDelete: 'CASCADE', // If a Customer is deleted, their orders will be deleted as well
      },
      orderStatus: {
        type: Sequelize.ENUM('Added To Cart', 'Ordered'),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
