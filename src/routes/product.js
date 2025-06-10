const { Router } = require('express');
const {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
} = require('../controllers/product');

const router = Router();

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/', addProduct);

router.put('/:id', editProduct);

router.delete('/:id', deleteProduct);

module.exports = router;
