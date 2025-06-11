const { Router } = require('express');
const {
  getProducts,
  searchProducts,
  getProductById,
  getProductBySeller,
  addProduct,
  editProduct,
  deleteProduct,
} = require('../controllers/product');
const checkJWT = require('../middleware/checkJWT');

const router = Router();

router.get('/', getProducts);

router.get('/search', searchProducts);

router.get('/seller/product', checkJWT, getProductBySeller);

router.get('/:id', getProductById);

router.post('/', checkJWT, addProduct);

router.put('/:id', checkJWT, editProduct);

router.delete('/:id', checkJWT, deleteProduct);

module.exports = router;
