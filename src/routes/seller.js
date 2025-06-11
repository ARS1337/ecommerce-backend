const { Router } = require('express');
const { logIn, logOut, getSellerDetails } = require('../controllers/seller');
const checkJWT = require('../middleware/checkJWT');

const router = Router();

router.post('/login', logIn);

router.post('/logout', logOut);

router.get('/details', checkJWT, getSellerDetails);

module.exports = router;
