const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./routes/ProductRoutes');
const { check } = require('express-validator');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});


app.use('/api/products', productRoutes);


app.listen(5000);

app.post('/api/signup/',
    [
        check('name').not().isEmpty(),
        check('email').not().isEmpty(),
        check('password').not().isEmpty(),
        check('phone').not().isEmpty(),
        check('phone').isLength({ min: 6 })
    ],
    async (req, res, next) => {

        res.json(res.status(200).json( "received"));
    }
);
// mongoose
//     .connect(
//         `mongodb://anasir:mongopassword@cluster0-shard-00-00.pc12j.mongodb.net:27017,cluster0-shard-00-01.pc12j.mongodb.net:27017,cluster0-shard-00-02.pc12j.mongodb.net:27017/store?ssl=true&replicaSet=atlas-yd2hqb-shard-0&authSource=admin&retryWrites=true&w=majority`
//     )
//     .then(() => {
//
//     })
//     .catch(err => {
//         console.log(err);
//     });
