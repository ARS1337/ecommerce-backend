const { Router } = require('express');
const {
  logIn,
  logOut,
  signUp,
  getCustomerDetails,
  setCustomerDetails,
} = require('../controllers/customer');
const checkJWT = require('../middleware/checkJWT');

const router = Router();

router.post('/login', logIn);

router.post('/signup', signUp);

router.post('/logout', logOut);

router.get('/details', checkJWT, getCustomerDetails);

router.post('/details', checkJWT, setCustomerDetails);

module.exports = router;
