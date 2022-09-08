const { StatusCodes } = require('http-status-codes');
const CustomErrorClass = require('./custom_error');

class BadRequestErrorClass extends CustomErrorClass{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestErrorClass;