const mongoose = require('mongoose');

/**
 * PRODUCT SCHEMA: 
 *          name: String
 *          description: String
 *          productCategory: String
 *          price: Number
 *          quantityAvailable: Number
 *          user: ObjectId
 */

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide product name"]
    },

    description: {
        type: String,
        required: [true, "Please provide product description"],
        minLength: 10
    },

    productCategory: {
        type: String,
        required: [true, "Please provide product category"]
    },

    price: {
        type: Number,
        required: [true, "Please provide product price"],
        min: [0, "Price can't be negative"]
    },

    quantityAvailable: {
        type: Number,
        required: [true, "Please provide quantity available"],
        min: [1, "Quantity can't be less than 1"]
    },

    // this user should be with admin role
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;