/**
 * Created by unio-raj on 4/7/17.
 */

"use strict";

let net = require('net');
let config = require('./../../config/config.json'),
    deviceDataParsing = require('./device.data.parsing.controller.js');


module.exports = function(){
    let tcp = net.createServer(function (socket) {


        socket.on('connect',function(){
        	console.log('successfully connected to tcp client');
        });


        socket.on('data', function (deviceRecievedData) {
          /*
              validation based on packet length
          */
          /*      deviceDataParsing.validatingDataPackets(deviceRecievedData).then(function(validatedCondition){
                  socket.write(String.fromCharCode(validatedCondition));
                }).catch();
          */
                  socket.write(String.fromCharCode(0x01));
            });


        socket.on('close', function () {
            console.log('tcp connection closed');
        });


        socket.on('error', function (err) {
            console.log('error in tcp socket connection:',err);
        });


    }).listen(config.tcp.port,function(){
    	console.log('tcp port had started listening at port number:',config.tcp.port);
    });
};
