const { Category } = require('../../models');

const getCategories = async (req, res) => {
  const { limit = 6, offset = 0 } = req.query;
  const data = await Category.findAll({
    limit,
    offset,
    attributes: ['id', 'name'],
  });
  return res.status(200).json({ data });
};

module.exports = { getCategories };
