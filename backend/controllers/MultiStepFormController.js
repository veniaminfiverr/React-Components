const { validationResult } = require('express-validator');
const HttpError = require("../models/http-error");
const MultiStepForm = require('../models/MultiStepForm');

const submitForm = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }
    const multiStepForm = new MultiStepForm({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        nickName:req.body.nickName,
        emailAddress:req.body.emailAddress,
        phoneNumber:req.body.phoneNumber,
        alternatePhone: req.body.alternatePhone,
        address:req.body.address,
        country: req.body.country,
        city:req.body.city
    });
    const result = await multiStepForm.save();
    res.json(result);
}

exports.submitForm = submitForm;