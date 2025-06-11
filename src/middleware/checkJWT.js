module.exports = (req, res, next) => {
  const token = req.cookies['access_token'];
  if (token) {
    next();
  } else {
    return res.status(401).json({ message: 'jwt must be provided' });
  }
};
