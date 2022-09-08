const { StatusCodes } = require('http-status-codes');
const CustomErrorClass = require('./custom_error');

class NotFoundErrorClass extends CustomErrorClass{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundErrorClass;