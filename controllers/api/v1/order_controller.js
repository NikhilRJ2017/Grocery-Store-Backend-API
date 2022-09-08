const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../../../config/errors');
const Order = require('../../../models/Order');
const Product = require('../../../models/Product');

// ************************* create order *************************//
const createOrder = async (req, res) => {
    const { cartItems, paymentInfo } = req.body;

    // checking for null values for cartitems and payment info
    if (!cartItems || cartItems.length < 1) {
        throw new BadRequestError("There are no items in cart")
    }

    if (!paymentInfo) {
        throw new BadRequestError("Please provide payment information")
    }

    let orderItems = [];
    let subTotal = 0;

    // iterating over all items in cart
    for (const item of cartItems) {
        // checking if item exist
        let isProduct = await Product.findById(item.product);
        if (!isProduct) {
            throw new NotFoundError(`No product with id ${item.product}`);
        }

        // check if required quantity is available
        if (Number(item.quantity) > Number(isProduct.quantityAvailable)) {
            throw new BadRequestError(`Available quantity with product id ${item.product} is ${Number(isProduct.quantityAvailable)} and requested is ${Number(item.quantity)}, therfore can't process your order`);
        }

        // updating the inventory
        const inventoryStock = Number(isProduct.quantityAvailable) - Number(item.quantity);
        isProduct = await Product.findOneAndUpdate({ _id: isProduct },
            { quantityAvailable: inventoryStock }, {
            new: true, runValidators: true
        });

        // construction single item
        const { name, price, _id } = isProduct;
        const singleOrderItem = {
            name,
            price,
            product: _id,
            quantity: item.quantity
        }

        orderItems.push(singleOrderItem);
        subTotal += Number(item.quantity) * price;
    }
    
    const total = subTotal;
    
    const { userId } = req.user;

    let order = await Order.create({
        cartItems: orderItems,
        total,
        paymentInfo,
        user: userId
    });

    await order.populate({ path: 'user', select: 'name email' });

    res.status(StatusCodes.CREATED).json({
        message: "Success",
        order: order
    });
}

module.exports = {
    createOrder
}