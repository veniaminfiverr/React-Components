const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const webSocketServer = require('websocket').server;
const http = require('http');
const authRoutes = require('./routes/AuthRoutes');
const multiStepFormRoutes = require('./routes/MultiStepFormRoutes');
const feedRoutes = require('./routes/FeedRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use('/api', authRoutes);
app.use('/api/multistepform', multiStepFormRoutes);
app.use('/api/feeds', feedRoutes);

const server = http.createServer();
server.listen(8001);

const wsServer = new webSocketServer({
    httpServer: server
});
const clients = {};

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
        if (message.type === 'utf8') {
            // broadcasting message to all connected clients
            for(key in clients) {
                clients[key].sendUTF(message.utf8Data);
               // console.log('sent Message to: ', clients[key]);
            }
        }
    })
});

mongoose
    .connect(process.env.DB_STRING)
    .then(() => {
        console.log('connected')
        app.listen(process.env.PORT || 5000);
    })
    .catch(err => {
        //console.log(err);
    });