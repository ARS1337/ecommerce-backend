const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Customer } = require('../../models');

const signUp = async (req, res) => {
  const { name, userName, password } = req.body;
  const customer = await Customer.findOne({
    where: {
      userName: userName.toLowerCase(),
    },
  });
  if (customer) {
    return res
      .status(400)
      .json({ message: 'user already exists with this username' });
  }
  await Customer.create({
    name,
    userName: userName.toLowerCase(),
    password,
  });
  return res.status(201).json({ message: 'success' });
};

const logIn = async (req, res) => {
  const { userName, password } = req.body;
  const customer = await Customer.findOne({
    where: {
      userName: userName.toLowerCase(),
    },
  });
  if (!customer) {
    return res.status(401).json({ message: 'incorrect credentials' });
  }
  const isMatch = bcrypt.compareSync(password, customer.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'incorrect credentials' });
  }
  const SECRET = process.env.JWT_SECRET;
  const token = jwt.sign(
    {
      name: customer.name,
      id: customer.id,
      role: customer.role,
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

const getCustomerDetails = async (req, res) => {
  const token = req.cookies['access_token'];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const customer = await Customer.findOne({
    where: {
      id: decodedToken.id,
    },
    attributes: ['id', 'name', 'userName', 'details'],
  });
  return res.status(200).json(customer);
};

const setCustomerDetails = async (req, res) => {
  const token = req.cookies['access_token'];
  const { details } = req.body;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const customer = await Customer.findOne({
    where: {
      id: decodedToken.id,
    },
    attributes: ['id', 'name', 'userName', 'details'],
  });
  if (!customer) {
    return res.status(404).json({ message: 'customer not found' });
  }
  const updatedCustomer = await customer.update({ details });
  return res.status(200).json(updatedCustomer);
};

module.exports = {
  logIn,
  logOut,
  signUp,
  getCustomerDetails,
  setCustomerDetails,
};
