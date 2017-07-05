/**
 * Created by unio-raj on 4/7/17.
 */

"use strict";

var net = require('net');
var config = require('./../../config/config.json'),
    parser = require('./parse.js');

module.exports = function(){
    var tcp = net.createServer(function (socket) {
           
        socket.on('connect',function(){
        	console.log('successfully connected to tcp client');
        });

        socket.on('data', function (deviceData) {
            console.log('data recieved from device: ',typeof deviceData);
          // console.log("data:",JSON.stringify(deviceData));
            try{
                var parse = parser.parse(socket,deviceData);
		if(parse){
		console.log('data recieved haha ', parse);
		}      
            } catch (ex) {
             	console.log('error in parsing data');
            }
        });

        

        socket.on('close', function () {
            console.log('tcp connection closed');
        });


        socket.on('error', function (err) {
            console.log('error in tcp socket connection:',err);
        });


        socket.on('error', function (err) {
            console.log('error in tcp connection: ',err);
        });

    }).listen(config.tcp.port,function(){
    	console.log('tcp port had started listening at port number:',config.tcp.port);
    });
};
