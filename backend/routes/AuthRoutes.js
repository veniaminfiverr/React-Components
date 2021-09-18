const express = require('express');
const { check } = require('express-validator');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.post(
    '/signup/',
    [
        check('name').not().isEmpty(),
        check('email').not().isEmpty(),
        check('password').not().isEmpty(),
        check('phone').not().isEmpty(),
        check('phone').isLength({ min: 6 })
    ],
    AuthController.signup
);

router.post(
    '/login/',
    [
        check('email').not().isEmpty().isEmail(),
        check('password').not().isEmpty(),
    ],
    AuthController.login
);

module.exports = router;