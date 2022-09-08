const { verifyJWT } = require('../utils/jwt');
const { UnauthorizedError, UnauthenticatedError } = require('../errors');

// ************************ middleware to check if user is authenticated or not *************************//
const isAuth = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new UnauthenticatedError("Authentication invalid")
    }

    try {
        const { name, userId, email, role } = verifyJWT(token);
        req.user = {
            userId,
            name,
            email,
            role
        }

        next();
        
    } catch (error) {
        throw new UnauthenticatedError("Authentication invalid")
    }

}

// ************************* middleware to authorize permission to certain roles **************************//
const authorizePermissions = (...roles) => { 
    return (req, res, next) => { 
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError("Unauthorized to access this resource")
        }

        next()
    }
}

module.exports = {
    isAuth,
    authorizePermissions
}