const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../../../config/errors');
const Order = require('../../../models/Order');
const User = require('../../../models/User');

// ********************* get current logged in user ***********************//
const getCurrentUser = async (req, res) => { 
    res.status(StatusCodes.OK).json({
        message: "Success",
        user: req.user
    })
}

// ********************* get current user order list ************************//
const getCurrentUserOrderList = async (req, res) => {
    const { userId } = req.user;
    const orders = await Order.find({ user: userId });
    res.status(StatusCodes.OK).json({
        message: "Success",
        count: orders.length,
        orders: orders
    })
}

// ********************* fetch all customers - only admin accessible *************************//
const fetchAllCustomers = async (req, res) => {
    const users = await User.find({ role: 'customer' }).select('-password -role').sort({'createdAt': -1});
    res.status(StatusCodes.OK).json({
        message: "Success",
        count: users.length,
        customers: users
    })
}

// ********************* fetch all customer's orders - only admin accessible *************************//
const fetchCustomerOrderList = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw new NotFoundError(`User with id ${id} not found`);
    }

    const orders = await Order.find({ user: id });
    let totalSpent = 0;
    for (let item of orders) {
        totalSpent += Number(item.total);
    }

    res.status(StatusCodes.OK).json({
        message: "Success",
        count: orders.length,
        TotalSpent: totalSpent,
        orders: orders
    })
}

// *********************** fetch customer with highest order (in terms of highest order count) - only admin accessible
const fetchCustomerWithHighestOrder = async (req, res) => {
    const user = await User.find({}).sort({ 'totalOrders': -1 }).limit(1).select('-password');
    res.status(StatusCodes.OK).json({
        message: "Success",
        user: user
    })
}


module.exports = {
    getCurrentUser,
    getCurrentUserOrderList,
    fetchAllCustomers,
    fetchCustomerOrderList,
    fetchCustomerWithHighestOrder
}