/**
 * Created by unio-raj on 4/7/17.
 */

var express = require('express');
var app = express();
var router = express.Router();
var serverconfig = require('./app/config/config.json');
var devicedataroute = require('./app/routes/device.data.demo');

app.route('/').get(function (req,res) {
   res.send('hello world');
});

app.listen(serverconfig.http.port,function () {
    console.log("http server is running on port number: 8080");
});
