require('dotenv').config({ path: '../../.env' });
const jwt = require('jsonwebtoken');

// *********************** create a token user (payload) ************************//
const createTokenUser = (user) => {
    return {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
}

// ************************ sign a jwt ******************************//
const issueJWT = (tokenUser) => {
    //tokenUser is payload
    const secret = process.env.JWT_SECRET || 'n2r5u8x/A%D*G-KaPdSgVkYp3s6v9y$B'
    const options = {
        algorithm: process.env.JWT_ALGORITHM || 'HS256',
        expiresIn: process.env.JWT_LIFE || '1d'
    }

    const token = jwt.sign(tokenUser, secret, options);
    return token;
}

// *********************** attach cookies to response with jwt **************************//
const attachCookiesToResponse = (res, token) => {
    const life = 1000 * 60 * 60 * 24;
    const cookieOptions = {
        expires: new Date(Date.now() + life),
        httpOnly: true
    }

    res.cookie('token', token, cookieOptions)

}

// ************************* verify jwt ***************************//
const verifyJWT = (token) => {
    if (!token) {
        return;
    }
    const JWTSECRET = process.env.JWT_SECRET || 'n2r5u8x/A%D*G-KaPdSgVkYp3s6v9y$B'
    return jwt.verify(token, JWTSECRET);
}

module.exports = {
    createTokenUser,
    issueJWT,
    verifyJWT,
    attachCookiesToResponse
}