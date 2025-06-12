const { Router } = require('express');
const { getCategories } = require('../controllers/category');
const validateSchema = require('../middleware/validateSchema');
const { getCategoriesSchema } = require('../schema/category');

const router = Router();

router.get('/', validateSchema(getCategoriesSchema), getCategories);

module.exports = router;
