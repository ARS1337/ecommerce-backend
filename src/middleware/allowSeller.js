const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.cookies['access_token'];
  const { role } = jwt.verify(token, process.env.JWT_SECRET);
  if (role == 'SELLER') {
    next();
  } else {
    return res
      .status(403)
      .json({ message: 'only seller can access this resource' });
  }
};
