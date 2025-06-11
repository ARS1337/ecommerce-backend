const express = require('express');
const { Sequelize } = require('sequelize');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const sellerRoutes = require('./routes/seller');
const customerRoutes = require('./routes/customer');
const orderRoutes = require('./routes/order');

const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    throw error;
  });

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get('/', (req, res) => {
  return res.status(200).json({ hello: 'world' });
});

app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/seller', sellerRoutes);
app.use('/customer', customerRoutes);
app.use('/order', orderRoutes);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
