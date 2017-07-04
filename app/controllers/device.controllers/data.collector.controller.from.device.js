/**
 * Created by unio-raj on 4/7/17.
 */

"use strict";

var net = require('net');
var config = require('./../../config/config.json');


module.exports = function(){
	var tcpInputEncoding = config.get('tcp:input_log_encoding') || 'ascii';
    var tcpIdleTimeout = config.get('tcp:idle_timeout') || 30000;
    var portTcp = config.get('tcp:port');
    var tcp = net.createServer(function (socket) {

        var client = 'host ' + socket.remoteAddress + ':' + socket.remotePort;
        console.log('client address: ',client);
        
        socket.on('connect',function(){
        	console.log('successfully connected to tcp client');
        });
        socket.on('data', function (deviceData) {
            console.log('data recieved from device: ',deviceData);
        });

        socket.on('close', function () {
            
        });

        socket.on('error', function (err) {
            
        });

    }).listen(config.tcp.port,function(){
    	console.log('tcp port had started listening at port number:',config.tcp.port);
    });
};