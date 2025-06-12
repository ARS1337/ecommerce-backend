const { Router } = require('express');
const {
  logIn,
  logOut,
  signUp,
  getCustomerDetails,
  setCustomerDetails,
} = require('../controllers/customer');
const checkJWT = require('../middleware/checkJWT');
const allowCustomer = require('../middleware/allowCustomer.js');
const validateSchema = require('../middleware/validateSchema.js');
const {
  signUpSchema,
  logInSchema,
  setDetailsSchema,
} = require('../schema/customer.js');

const router = Router();

router.post('/login', validateSchema(logInSchema), logIn);

router.post('/signup', validateSchema(signUpSchema), signUp);

router.post('/logout', logOut);

router.get('/details', checkJWT, allowCustomer, getCustomerDetails);

router.post(
  '/details',
  checkJWT,
  allowCustomer,
  validateSchema(setDetailsSchema),
  setCustomerDetails
);

module.exports = router;
