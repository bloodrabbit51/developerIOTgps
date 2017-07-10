/**
 * Created by unio-raj on 4/7/17.
 */


var express = require('express');
var app = express();
var server = require('http').Server(app);
var router = express.Router();
var serverconfig = require('./app/config/config.json');
var devicedataroute = require('./app/routes/device.data.demo');
var gpsdevicedataController = require('./app/controllers/device.controllers/data.collector.controller.from.device.js')();
var mongoose = require('mongoose');
var deviceData = require('./app/models/device.data.schema.js');
var morgan = require('morgan');
var io = require('socket.io')(server);


mongoose.connect(serverconfig.mongo.db, function (err, res) {
    if (err) {
        console.log('Error connecting: ', serverconfig.mongo.db, ':', err.message);
    } else {
        console.log('Succesfully connected to: ', serverconfig.mongo.db);
    }
});


app.use(morgan('dev'));


app.route('/').get(function (req, res) {
    var obj = deviceData({
        name: "Rohan Raj",
        username: "rohanraj7316@gmail.com",
        location: "Hyderabad"
    });
    obj.save(function (err) {
        if (err) {
            res.status(400).json({
                status: "failed",
                message: "entering data into database failed"
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "entring data into database succesfull"
            });
        }
    });
});


app.route('/getuserdetail').get(function (req, res) {
    deviceData.find({}, function (err, data) {
        if (err) {
            res.status(400).json({
                status: "failed",
                message: "error while retriving data: ", err
            });
        } else {
            res.status(200).json({
                status: "success",
                data: data
            });
        }
    });
});

app.route('/index.html').get(function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection',function (socket) {
    console.log('connection with http succesfully created');
    socket.emit('news',{hello : "i am socket http"});
});



server.listen(serverconfig.http.port, function () {
    console.log("http server is running on port number: 7070");
});


