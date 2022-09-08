const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

/**
 * USER SCHEMA:
 *          name: String
 *          email: String
 *          password: String
 *          role: String
 *          totalOrders: Number
 */

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minLength: [3, "Name too short"],
        maxLength: [30, "Name too long"]
    },

    email: {
        type: String,
        unique: [true, "Email already exist"],
        required: [true, "Please provide email"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide valid email"
        }
    },

    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: [6, "Password too short"]
    },

    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'user'
    },

    // update this total orders from order using aggregate function
    totalOrders: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// ********************** salting and hashing password before saving into database ************************//
UserSchema.pre('save', async function () { 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

// ********************** comparing passwords for login ***********************//
UserSchema.methods.comparePassword = async function (userEnteredPassword) {
    const isMatch = await bcrypt.compare(userEnteredPassword, this.password);
    return isMatch;
}
const User = mongoose.model('user', UserSchema);
module.exports = User