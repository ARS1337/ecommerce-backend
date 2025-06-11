const { Order, OrderProduct, Product, sequelize } = require('../../models');
const jwt = require('jsonwebtoken');

const createOrder = async (req, res) => {
  const token = req.cookies['access_token'];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const { cart, address, deliveryInstructions } = req.body;

  const t = await sequelize.transaction();

  try {
    const order = await Order.create(
      {
        customerId: decodedToken.id,
        orderStatus: 'Ordered',
        address: address,
        deliveryInstructions: deliveryInstructions,
      },
      { transaction: t }
    );

    const orderProducts = cart.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: parseInt(item.quantity),
    }));

    await OrderProduct.bulkCreate(orderProducts, { transaction: t });

    await t.commit();
    return res.status(201).json({ message: 'success' });
  } catch (err) {
    await t.rollback();
    return res
      .status(500)
      .json({ message: 'something went wrong', error: err.message });
  }
};

const getOrderByCustomer = async (req, res) => {
  const token = req.cookies['access_token'];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const { offset = 0, limit = 5 } = req.query;
  const customerOrders = await Order.findAndCountAll({
    limit,
    offset,
    distinct: true,
    where: {
      customerId: decodedToken.id,
    },
    include: [
      {
        model: Product,
        through: {
          attributes: ['quantity'],
        },
      },
    ],
  });
  return res
    .status(200)
    .json({ count: customerOrders.count, data: customerOrders.rows });
};

module.exports = { createOrder, getOrderByCustomer };
