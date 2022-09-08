const express = require('express');
const router = express.Router();
const { isAuth, authorizePermissions } = require('../config/middleware/authMiddleware');
const { createProduct, updateProduct, fetchAllAvailableProducts } = require('../controllers/api/v1/product_controller');


router.route('/fetchAllAvailableProducts').get(isAuth, fetchAllAvailableProducts);
router.route('/create').post(isAuth, authorizePermissions('admin'), createProduct); // only admin accessible
router.route('/update/:id').patch(isAuth, authorizePermissions('admin'), updateProduct); // only admin accessible


module.exports = router;