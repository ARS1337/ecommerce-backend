const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Seller } = require('../../models');

const logIn = async (req, res) => {
  const { userName, password } = req.body;
  const seller = await Seller.findOne({
    where: {
      userName,
    },
  });
  if (!seller) {
    return res.status(401).json({ message: 'incorrect credentials' });
  }
  const isMatch = bcrypt.compareSync(password, seller.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'incorrect credentials' });
  }
  const SECRET = process.env.JWT_SECRET;
  const token = jwt.sign(
    {
      name: seller.name,
      id: seller.id,
      role: seller.role,
    },
    SECRET,
    { expiresIn: '24h' }
  );
  res.cookie('access_token', token, {
    httpOnly: true,
    sameSite: 'Lax',
  });
  return res.status(200).json({ message: 'login success' });
};

const logOut = async (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    sameSite: 'Lax',
  });
  return res.status(200).json({ message: 'Successfully logged out.' });
};

const getSellerDetails = async (req, res) => {
  const token = req.cookies['access_token'];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const seller = await Seller.findOne({
    where: {
      id: decodedToken.id,
    },
    attributes: ['id', 'name', 'userName'],
  });
  return res.status(200).json(seller);
};

module.exports = { logIn, logOut, getSellerDetails };
