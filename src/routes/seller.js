const { Router } = require('express');
const { logIn, logOut, getSellerDetails } = require('../controllers/seller');
const checkJWT = require('../middleware/checkJWT');
const allowSeller = require('../middleware/allowSeller.js');
const validateSchema = require('../middleware/validateSchema.js');
const { logInSchema } = require('../schema/seller.js');

const router = Router();

router.post('/login', validateSchema(logInSchema), logIn);

router.post('/logout', logOut);

router.get('/details', checkJWT, allowSeller, getSellerDetails);

module.exports = router;
