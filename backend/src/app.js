const express = require('express');
const cors = require('cors');
const { connectMongo } = require('./config/mongo');
const sequelize = require('./config/mysql');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectMongo(process.env.MONGO_URI);
sequelize.authenticate()
  .then(()=> console.log('MySQL connected'))
  .catch(err=> console.error('MySQL error', err));

app.get('/', (req,res)=> res.send('MEAN CRUD API'));
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/weather', weatherRoutes);

module.exports = app;
