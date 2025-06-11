const { Router } = require('express');
const { createOrder, getOrderByCustomer } = require('../controllers/order');
const checkJWT = require('../middleware/checkJWT');

const router = Router();

router.post('/', checkJWT, createOrder);

router.get('/customerOrder', checkJWT, getOrderByCustomer);

module.exports = router;
