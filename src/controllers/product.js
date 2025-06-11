const { Product, Category, Seller, Order } = require('../../models');
const { Op, fn, col, where } = require('sequelize');
const jwt = require('jsonwebtoken');

const getProducts = async (req, res) => {
  let {
    limit = 10,
    offset = 0,
    category,
    tags,
    priceGT = 0,
    priceLT = 99999999,
  } = req.query;

  category = category ? `%${category}%` : '%';

  const tagsQuery = tags?.split(',') || [];

  let whereClause = {};

  if (tagsQuery.length > 0) {
    whereClause.tags = { [Op.overlap]: tagsQuery };
  }

  whereClause[Op.and] = [
    where(fn('COALESCE', col('discountedPrice'), col('price')), {
      [Op.gte]: parseFloat(priceGT),
    }),
    where(fn('COALESCE', col('discountedPrice'), col('price')), {
      [Op.lte]: parseFloat(priceLT),
    }),
  ];

  const products = await Product.findAll({
    limit,
    offset,
    include: [
      {
        model: Category,
        where: {
          name: {
            [Op.iLike]: category,
          },
        },
        required: true,
        attributes: [],
      },
    ],
    where: whereClause,
    attributes: ['id', 'name', 'image', 'price', 'discountedPrice', 'rating'],
  });
  return res.status(200).json({ products });
};

const searchProducts = async (req, res) => {
  let {
    limit = 10,
    offset = 0,
    category,
    tags = [],
    priceGT = 0,
    priceLT = 99999999,
    search,
  } = req.query;

  category = category ? `%${category}%` : '%';

  search = search ? `%${search}%` : '%';

  const tagsQuery = tags.push(search);

  let whereClause = {};

  let whereClauseNested = {};

  whereClauseNested.name = {
    [Op.iLike]: category,
  };

  if (tagsQuery.length > 0) {
    whereClause.tags = { [Op.overlap]: tagsQuery };
  }

  whereClause[Op.and] = [
    where(fn('COALESCE', col('discountedPrice'), col('price')), {
      [Op.gte]: parseFloat(priceGT),
    }),
    where(fn('COALESCE', col('discountedPrice'), col('price')), {
      [Op.lte]: parseFloat(priceLT),
    }),
  ];
  whereClause[Op.or] = [
    { name: { [Op.iLike]: search } },
    { description: { [Op.iLike]: search } },
  ];

  let products = {};
  try {
    products = await Product.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: Category,
          where: whereClauseNested,
          required: true,
          attributes: [],
        },
      ],
      where: whereClause,
      attributes: ['id', 'name', 'image', 'price', 'discountedPrice', 'rating'],
      distinct: true,
    });
  } catch (error) {
    console.log(error + 'fdsfsdfsafasdfdsafsadfdsafsadfafadsfa');
  }
  //   const products = await Product.findAndCountAll({
  //     limit,
  //     offset,
  //     include: [
  //       {
  //         model: Category,
  //         where: {
  //           name: {
  //             [Op.iLike]: category,
  //           },
  //         },
  //         required: true,
  //         attributes: [],
  //       },
  //     ],
  //     where: whereClause,
  //     attributes: ['id', 'name', 'image', 'price', 'discountedPrice', 'rating'],
  //     distinct: true,
  //   });
  return res.status(200).json({ count: products.count, data: products.rows });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Category,
        attributes: ['name'],
      },
      {
        model: Seller,
        attributes: ['name'],
      },
    ],
  });
  if (!product) {
    return res.status(404).json({ message: 'product not found for id' });
  }
  return res.status(200).json(product);
};

const getProductBySeller = async (req, res) => {
  const token = req.cookies['access_token'];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const { limit = 5, offset = 0 } = req.query;
  let products;
  try {
    products = await Product.findAndCountAll({
      limit,
      offset,
      where: {
        sellerId: decodedToken.id,
      },
      include: [
        {
          model: Order,
          through: {
            attributes: ['quantity'],
          },
        },
      ],
      distinct: true,
    });
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ count: products.count, data: products.rows });
};

const addProduct = async (req, res) => {
  const {
    name,
    description,
    image,
    extraImages,
    price,
    discountedPrice,
    rating,
    tags,
    categoryId,
  } = req.body;
  const token = req.cookies['access_token'];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const category = await Category.findOne({
    where: {
      id: categoryId,
    },
  });
  console.log('cateory id ' + category);
  if (!category) {
    return res
      .status(404)
      .json({ message: 'category not found for categoryId' });
  }
  const product = await Product.create({
    name,
    description,
    image: image,
    extraImages: extraImages,
    price: parseFloat(price),
    discountedPrice: discountedPrice ? parseFloat(discountedPrice) : null,
    rating: rating ? parseInt(rating) : null,
    tags: tags,
    categoryId,
    sellerId: decodedToken.id,
  });

  const resultProduct = await Product.findOne({
    where: {
      id: product.id,
    },
    include: [
      { model: Seller, attributes: ['name'] },
      { model: Category, attributes: ['name'] },
    ],
  });
  return res.status(201).json(resultProduct);
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    image,
    extraImages,
    price,
    discountedPrice,
    rating,
    tags,
    categoryId,
  } = req.body;
  const editBody = {};
  const token = req.cookies['access_token'];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const product = await Product.findOne({
    where: {
      id,
    },
  });
  if (!product) {
    return res.status(404).json({ message: 'product not found for productId' });
  }
  const category = await Category.findOne({
    where: {
      id: categoryId,
    },
  });
  if (!category) {
    return res
      .status(404)
      .json({ message: 'category not found for categoryId' });
  }
  if (product.sellerId != decodedToken.id) {
    return res
      .status(403)
      .json({ message: 'seller can only update their own products' });
  }
  if (name) {
    editBody.name = name;
  }
  if (description) {
    editBody.description = description;
  }
  if (image) {
    editBody.image = image;
  }
  if (extraImages) {
    editBody.extraImages = extraImages;
  }
  if (price) {
    editBody.price = parseFloat(price);
  }
  if (discountedPrice) {
    editBody.discountedPrice = parseFloat(discountedPrice);
  }
  if (rating) {
    editBody.rating = parseInt(rating);
  }
  if (tags) {
    editBody.tags = tags;
  }
  const updatedProduct = await product.update(editBody);
  return res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies['access_token'];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const product = await Product.findOne({
    where: {
      id,
    },
  });
  if (!product) {
    return res.status(404).json({ message: 'product not found for productId' });
  }
  if (product.sellerId != decodedToken.id) {
    return res
      .status(403)
      .json({ message: 'seller can only delete their own products' });
  }
  const deletedCount = await Product.destroy({
    where: {
      id,
    },
  });
  return res.status(200).json({ message: 'success', deletedCount });
};

module.exports = {
  getProducts,
  searchProducts,
  getProductById,
  getProductBySeller,
  addProduct,
  editProduct,
  deleteProduct,
};
