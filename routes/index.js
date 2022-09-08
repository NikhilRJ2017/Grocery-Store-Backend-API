const express = require('express');
const router = express.Router();

const authRoutes = require('./auth_route')
const userRoutes = require('./user_route')
const productRoutes = require('./product_route')
const orderRoutes = require('./order_route')

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);

module.exports = router;