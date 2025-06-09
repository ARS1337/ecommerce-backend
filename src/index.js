const express = require('express');
const { Sequelize } = require('sequelize');

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

app.get('/', (req, res) => {
  return res.status(200).json({ hello: 'world' });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
