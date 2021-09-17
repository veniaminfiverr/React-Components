const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./routes/ProductRoutes');
const { check } = require('express-validator');
const User = require('./models/User');
const MultiStepForm = require('./models/MultiStepForm');
const HttpError = require("./models/http-error");
const {validationResult} = require("express-validator");


const app = express();
app.use(bodyParser.json());

app.use('/api/products', productRoutes);

mongoose
    .connect(
        `mongodb://admin:admin@cluster0-shard-00-00.nk1m1.mongodb.net:27017,cluster0-shard-00-01.nk1m1.mongodb.net:27017,cluster0-shard-00-02.nk1m1.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-sfsjrq-shard-0&authSource=admin&retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.post('/api/signup/',
    [
        check('name').not().isEmpty(),
        check('email').not().isEmpty(),
        check('password').not().isEmpty(),
        check('phone').not().isEmpty(),
        check('phone').isLength({ min: 6 })
    ],
    async (req, res, next) => {
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
);

app.get('/api/users/:name', async (req, res, next) => {
        const userName = req.params.name;
        let user = await User.find({'name':userName});
        res.json(user);
        console.log(res.json(user));

    }
);


app.post('/api/multistepform/',
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
    async (req, res, next) => {
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
);
