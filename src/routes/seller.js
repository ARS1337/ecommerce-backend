const { Router } = require('express');
const { logIn, logOut, getSellerDetails } = require('../controllers/seller');

const router = Router();

router.post('/login', logIn);

router.post('/logout', logOut);

router.get('/details', getSellerDetails);

module.exports = router;
