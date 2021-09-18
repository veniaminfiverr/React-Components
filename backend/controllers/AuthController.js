const { validationResult } = require('express-validator');
const HttpError = require("../models/http-error");
const User = require('../models/User');
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }
    const createdUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
    });
    const result = await createdUser.save();
    res.json(result);
}

const login =  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }
    let token = jwt.sign(
        { email: req.body.email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );
    let user = await User.find({'email':req.body.email, 'password':req.body.password});
    if(!user || user.length === 0) {
        return next(new HttpError('User not found.', 422));
    }
    let updatedUser = {
        "id": user[0]._id,
        "name":user[0].name,
        "token":token
    };
    res.json(updatedUser);
}

exports.signup = signup;
exports.login = login;