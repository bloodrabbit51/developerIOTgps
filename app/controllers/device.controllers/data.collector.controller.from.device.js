/**
 * Created by unio-raj on 4/7/17.
 */

"use strict";

var net = require('net');
var config = require('./../../config/config.json');

module.exports = function(){
    var tcp = net.createServer(function (socket) {

        socket.on('connect',function(){
        	console.log('successfully connected to tcp client');
        });

        socket.on('data', function (deviceData) {

        });

        socket.on('close', function () {
            console.log('connection is closed');
        });

        socket.on('error', function (err) {
            console.log('error in tcp connection: ',err);
        });

    }).listen(config.tcp.port,function(){
    	console.log('tcp port had started listening at port number:',config.tcp.port);
    });
};