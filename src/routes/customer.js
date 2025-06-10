const { Router } = require('express');
const {
  logIn,
  logOut,
  getCustomerDetails,
  setCustomerDetails,
} = require('../controllers/customer');

const router = Router();

router.post('/login', logIn);

router.post('/logout', logOut);

router.get('/details', getCustomerDetails);

router.post('/details', setCustomerDetails);

module.exports = router;
