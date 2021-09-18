const express = require('express');
const { check } = require('express-validator');
const MultiStepFormController = require('../controllers/MultiStepFormController');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');

router.use(checkAuth);

router.post(
    '/',
    [
        check('firstName').not().isEmpty().isAlphanumeric(),
        check('lastName').not().isEmpty().isAlphanumeric(),
        check('nickName').not().isEmpty().isAlphanumeric(),
        check('emailAddress').not().isEmpty().isEmail(),
        check('phoneNumber').isNumeric(),
        check('alternatePhone').isNumeric(),
        check('country').not().isEmpty().isAlphanumeric(),
        check('city').not().isEmpty().isAlphanumeric(),
    ],
    MultiStepFormController.submitForm
);

module.exports = router;