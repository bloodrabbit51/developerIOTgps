/**
 * Created by unio-raj on 4/7/17.
 */

"use strict";

let net = require('net');
let config = require('./../../config/config.json'),
    parser = require('./parse.js');

module.exports = function(){
    let tcp = net.createServer(function (socket) {
           
        socket.on('connect',function(){
        	console.log('successfully connected to tcp client');
        });

        socket.on('data', function (deviceData) {
            console.log('data recieved from device: ',typeof deviceData);
          // console.log("data:",JSON.stringify(deviceData));
            try{
                let parse = parser.parse(socket,deviceData);
            } catch (ex) {
             	console.log('error in parsing data',ex);
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
