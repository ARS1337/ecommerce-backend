'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(2048),
      },
      extraImages: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      discountedPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false, // Product must belong to a Category
        references: {
          model: 'Categories', // The model that the foreign key is referencing
          key: 'id',
        },
        onDelete: 'CASCADE', // Optional: Delete the product if the category is deleted
      },
      sellerId: {
        type: Sequelize.UUID,
        allowNull: false, // Product must belong to a Seller
        references: {
          model: 'Sellers', // The model being referenced
          key: 'id', // Reference the id column of Sellers
        },
        onDelete: 'CASCADE', // Optional: If a Seller is deleted, delete related Products
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
    await queryInterface.dropTable('Products');
  },
};
