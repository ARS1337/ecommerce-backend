const { Router } = require('express');
const { createOrder, getOrderByCustomer } = require('../controllers/order');
const checkJWT = require('../middleware/checkJWT');
const allowCustomer = require('../middleware/allowCustomer.js');
const validateSchema = require('../middleware/validateSchema.js');
const {
  createOrderSchema,
  getCustomerOrderSchema,
} = require('../schema/order.js');

const router = Router();

router.post(
  '/',
  checkJWT,
  allowCustomer,
  validateSchema(createOrderSchema),
  createOrder
);

router.get(
  '/customerOrder',
  checkJWT,
  allowCustomer,
  validateSchema(getCustomerOrderSchema),
  getOrderByCustomer
);

module.exports = router;
