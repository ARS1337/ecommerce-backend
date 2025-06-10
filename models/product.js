'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: { name: 'categoryId', type: DataTypes.UUID },
      });
      Product.belongsTo(models.Seller, {
        foreignKey: { name: 'sellerId', type: DataTypes.UUID },
      });
      Product.belongsToMany(models.Order, {
        through: 'OrderProducts', // Name of the junction table
        foreignKey: { name: 'productId', type: DataTypes.UUID }, // The foreign key in the junction table that points to the Product
        otherKey: { name: 'orderId', type: DataTypes.UUID }, // The foreign key in the junction table that points to the Order
      });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(512),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(2048),
      },
      extraImages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discountedPrice: {
        type: DataTypes.DECIMAL(10, 2),
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false, // Ensures Product must belong to a Category
        references: {
          model: 'Categories', // Points to the Category table
          key: 'id',
        },
      },
      sellerId: {
        type: DataTypes.UUID,
        allowNull: false, // Ensures that Product must belong to a Seller
        references: {
          model: 'Sellers', // Points to the Seller table
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
