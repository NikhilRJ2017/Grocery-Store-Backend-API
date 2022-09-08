const express = require('express');
const router = express.Router();
const { isAuth, authorizePermissions } = require('../config/middleware/authMiddleware');
const { fetchAllCustomers, fetchCustomerOrderList, fetchCustomerWithHighestOrder, getCurrentUser, getCurrentUserOrderList } = require('../controllers/api/v1/user_controller');

router.route('/getCurrentUser').get(isAuth, getCurrentUser);
router.route('/getCurrentUserOrderList').get(isAuth, getCurrentUserOrderList);
router.route('/fetchAllCustomers').get(isAuth, authorizePermissions('admin'), fetchAllCustomers); // only admin accessible
router.route('/fetchCustomerOrderList/:id').get(isAuth, authorizePermissions('admin'), fetchCustomerOrderList); // only admin accessible
router.route('/fetchCustomerWithHighestOrder').get(isAuth, authorizePermissions('admin'), fetchCustomerWithHighestOrder); // only admin accessible

module.exports = router;