const express = require('express');
const { isAuth } = require('../config/middleware/authMiddleware');
const { createOrder } = require('../controllers/api/v1/order_controller');
const router = express.Router();

router.route('/create').post(isAuth, createOrder);

module.exports = router;