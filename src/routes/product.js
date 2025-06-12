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
const allowSeller = require('../middleware/allowSeller.js');
const validateSchema = require('../middleware/validateSchema.js');
const {
  getAllProductSchema,
  searchProductSchema,
  getProductByIdSchema,
  addProductSchema,
  editProductSchema,
  deleteProductByIdSchema,
  getProductBySellerSchema,
} = require('../schema/product.js');

const router = Router();

router.get('/', validateSchema(getAllProductSchema), getProducts);

router.get('/search', validateSchema(searchProductSchema), searchProducts);

router.get(
  '/seller/product',
  checkJWT,
  allowSeller,
  validateSchema(getProductBySellerSchema),
  getProductBySeller
);

router.get('/:id', validateSchema(getProductByIdSchema), getProductById);

router.post(
  '/',
  checkJWT,
  allowSeller,
  validateSchema(addProductSchema),
  addProduct
);

router.put(
  '/:id',
  checkJWT,
  allowSeller,
  validateSchema(editProductSchema),
  editProduct
);

router.delete(
  '/:id',
  checkJWT,
  allowSeller,
  validateSchema(deleteProductByIdSchema),
  deleteProduct
);

module.exports = router;
