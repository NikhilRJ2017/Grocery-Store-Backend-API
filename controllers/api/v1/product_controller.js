const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../../../config/errors');
const Product = require('../../../models/Product')

// ************************* fetching all available products ***************************//
const fetchAllAvailableProducts = async (req, res) => { 
    const products = await Product.find({}).sort({ 'createdAt': -1 });
    res.status(StatusCodes.OK).json({
        message: "Success",
        count: products.length,
        products: products
    })
}

// ************************** create product - only accessible to admins **************************//
const createProduct = async (req, res) => {
    const { name, description, productCategory, price, quantityAvailable } = req.body;
    const { userId} = req.user

    // checking for any empty values
    if (!name || !description || !productCategory || !price || !quantityAvailable) {
        throw new BadRequestError("Please provide all values: name, description, productCategory, price, quantityAvailable")
    }

    // handling validation for quantity and price at server level only
    if (quantityAvailable < 1) {
        throw new BadRequestError("quantityAvailable can't less than 1")
    }
    if (price < 0) {
        throw new BadRequestError("price can't less than 0")
    }

    const product = await Product.create({ name, description, productCategory, price, quantityAvailable, user: userId });

    res.status(StatusCodes.CREATED).json({
        message: "Success",
        product: product
    });
}

// **************************** update product - only accessible to admins ************************//
const updateProduct = async (req, res) => {

    //checking if product exists or not
    const { id: productId } = req.params;
    let product = await Product.findOne({ _id: productId });
    if (!productId) {
        throw new NotFoundError(`No product with id ${productId}`);
    }

    // getting values to update
    const { name, description, productCategory, price, quantityAvailable } = req.body;

    const updateFields = {};
    if (name) {
        updateFields.name = name;
    }
    if (description) {
        updateFields.description = description;
    }
    if (productCategory) {
        updateFields.productCategory = productCategory;
    }
    if (price) {
        updateFields.price = price;
    }
    if (quantityAvailable) {
        updateFields.quantityAvailable = quantityAvailable;
    }

    if (!updateFields) {
        throw new BadRequestError("Please provide some fields to update");
    }

    const { userId } = req.user;

    updateFields.user = userId;

    product = await Product.findOneAndUpdate({ _id: productId }, updateFields, { new: true, runValidators: true });

    
    res.status(StatusCodes.CREATED).json({
        message: "Success",
        product: product
    });
}

module.exports = {
    createProduct,
    updateProduct,
    fetchAllAvailableProducts
}