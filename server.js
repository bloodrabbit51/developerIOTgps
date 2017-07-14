/**
 * Created by unio-raj on 4/7/17.
 */

 
var express = require('express');
var app = express();
var server = require('http').Server(app);
var router = express.Router();
var serverconfig = require('./app/config/config.json');
var devicedataroute = require('./app/routes/device.data.route.js');
var gpsdevicedataController = require('./app/controllers/device.controllers/data.collector.controller.from.device.js')();
var mongoose = require('mongoose');
var morgan = require('morgan');
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

mongoose.connect(serverconfig.mongo.db, function (err, res) {
    if (err) {
        console.log('Error connecting: ', serverconfig.mongo.db, ':', err.message);
    } else {
        console.log('Succesfully connected to: ', serverconfig.mongo.db);
    }
});

app.use('/index.html', express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/',devicedataroute);

io.on('connection',function (socket) {
    console.log('connection with http succesfully created');
    setInterval(function(){
        socket.emit('news',{hello : "i am socket http"});
    }, 5000);
});



server.listen(serverconfig.http.port, function () {
    console.log("http server is running on port number: 7070");
});


