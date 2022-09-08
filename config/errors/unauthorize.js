const { StatusCodes } = require('http-status-codes');
const CustomErrorClass = require('./custom_error');

class UnauthorizeErrorClass extends CustomErrorClass{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

module.exports = UnauthorizeErrorClass;