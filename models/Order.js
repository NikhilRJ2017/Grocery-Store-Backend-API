const mongoose = require('mongoose');

/**
 * ORDER SCHEMA:
 *          cartItems: Array of Single Cart Schema Schema ([singleCartSchema]),
 *          total: Number
 *          paymentInfo: String
 *          status: String
 *          user: ObjectId
 * 
 * SingleCartSchema:
 *          name: String
 *          quantity: Number
 *          price: Number
 *          product: ObjectId
 */

const SingleCartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    }
});

const OrderSchema = new mongoose.Schema({
    cartItems: [SingleCartSchema],

    total: {
        type: Number,
        required: true
    },
    paymentInfo: {
        type: "String",
        enum: ['UPI', "CreditCard", "DebitCard", "COD"],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'failed', 'paid', 'delivered', 'cancelled'],
        default: 'pending'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
   
}, {
    timestamps: true
});


OrderSchema.statics.computeTotalOrderForAnUser = async function (userId) {
    const result = await this.aggregate([
        { $match: { user: userId } },
        { $group: { _id: null, totalOrders: { $sum: 1 } } }
    ]);


    try {
        await this.model('user').findOneAndUpdate(
            { _id: userId }, { totalOrders: result[0]?.totalOrders || 0 }
        );
    } catch (error) {
        if (error.message) {
            throw new CustomError(error.message);
        } else {
            console.log(error);
        }
    }
}

OrderSchema.post('save', async function () { 
    await this.constructor.computeTotalOrderForAnUser(this.user);
})

OrderSchema.index({
    user: 1
});


const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;