const { StatusCodes } = require('http-status-codes');
const CustomErrorClass = require('./custom_error');

class UnauthenticateErrorClass extends CustomErrorClass{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticateErrorClass;