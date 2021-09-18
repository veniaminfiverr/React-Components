const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./routes/ProductRoutes');
const { check } = require('express-validator');
const User = require('./models/User');
const MultiStepForm = require('./models/MultiStepForm');
const HttpError = require("./models/http-error");
const {validationResult} = require("express-validator");
const Feed = require('./models/Feed');
const webSocketServer = require('websocket').server;
const http = require('http');

const app = express();
app.use(bodyParser.json());

mongoose
    .connect(
        `mongodb://admin:admin@cluster0-shard-00-00.nk1m1.mongodb.net:27017,cluster0-shard-00-01.nk1m1.mongodb.net:27017,cluster0-shard-00-02.nk1m1.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-sfsjrq-shard-0&authSource=admin&retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        //console.log(err);
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

app.post('/api/login/',
    [
        check('email').not().isEmpty().isEmail(),
        check('password').not().isEmpty(),
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError('Invalid inputs passed, please check your data.', 422));
        }
        const user = await User.find({'email':req.body.email});
        if(!user || (user.length > 0 && user[0].password !== req.body.password)) {
            return next(new HttpError('User not found.', 422));
        }
        res.json(user[0]);
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

app.post('/api/feeds/:feedTitle',
    [
        check('name').not().isEmpty().isAlphanumeric(),
        check('rating').not().isEmpty().isAlphanumeric(),
        check('feedback').not().isEmpty(),
        check('userId').not().isEmpty()
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError('Invalid inputs passed, please check your data.', 422));
        }
        let createdFeed;
        const feedTitle = req.params.feedTitle;
        let foundFeed = await Feed.find({'name':feedTitle,'userId':req.body.userId});
        if(null != foundFeed && foundFeed.length > 0) {
            foundFeed[0].rating = req.body.rating;
            foundFeed[0].feedback = req.body.feedback;
            createdFeed = foundFeed[0];
        } else {
            createdFeed = new Feed({
                name: feedTitle,
                rating: req.body.rating,
                feedback: req.body.feedback,
                userId: req.body.userId
            });
        }
        const result = await createdFeed.save();
        res.json(result);
    }
);

app.get('/api/feeds/:userId/', async (req, res, next) => {
        const userId = req.params.userId;
        let feeds = await Feed.find({'userId':userId});
        res.json(feeds);
    }
);


const server = http.createServer();
server.listen(8001);
console.log('listening on port 8001');

const wsServer = new webSocketServer({
    httpServer: server
});
const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
    var userID = getUniqueID();
    //console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    //console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
    connection.on('message', function(message) {
        //console.log(message);
        if (message.type === 'utf8') {
           // console.log('Received Message: ', message.utf8Data);
            // broadcasting message to all connected clients
            for(key in clients) {
                clients[key].sendUTF(message.utf8Data);
               // console.log('sent Message to: ', clients[key]);
            }
        }
    })
});