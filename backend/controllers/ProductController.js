const { validationResult } = require('express-validator');
const Product = require('../models/Product');
const HttpError = require("../models/http-error");

const createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }
    const createdProduct = new Product({
        title: req.body.title,
        description: req.body.description
    });
    const result = await createdProduct.save();
    res.json(result);
};

const getProducts = async (req, res, next) => {
    let products ;
    try {
        products = await Product.find();
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again later.', 500);
        return next(error);
    }
    res.json(products);
};

const getProductByTitle = async (req, res, next) => {
    const productTitle = req.params.title;
    let product;
    product = await Product.find({'title':productTitle});
    res.json(product);
};


exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.getProductByTitle = getProductByTitle;