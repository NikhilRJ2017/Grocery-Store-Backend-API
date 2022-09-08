const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../../../config/errors');
const { createTokenUser, issueJWT, attachCookiesToResponse } = require('../../../config/utils/jwt')
const User = require('../../../models/User');


// ****************** signing up the customer/admin *******************//
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError("Please provide all values");
    }

    //making 1st signed up user as admin
    const docCount = await User.countDocuments({});
    const role = docCount === 0 ? 'admin' : 'customer';

    const user = await User.create({ name, email, password, role });

    const tokenUser = createTokenUser(user);
    const token = issueJWT(tokenUser);
    attachCookiesToResponse(res, token)
    
    res.status(StatusCodes.CREATED).json({
        message: "Success",
        user: tokenUser
    })
}

// ********************** login the customer/admin ****************************//
const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Please provide all values");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('Inavalid Credentials')
    }
    
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        throw new UnauthenticatedError('Inavalid Credentials')
    }

    const tokenUser = createTokenUser(user);
    const token = issueJWT(tokenUser);
    attachCookiesToResponse(res, token)

    res.status(StatusCodes.OK).json({
        message: "Success",
        user: tokenUser
    })
}

// ***************************** logout the customer/admin ****************************//
const logout = async (req, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() + 10),
        httpOnly: true
    };

    res.cookie('token', "Logout", cookieOptions);
    res.status(StatusCodes.OK).json({
        message: "Success"
    });
}

module.exports = {
    signup,
    signin,
    logout
}