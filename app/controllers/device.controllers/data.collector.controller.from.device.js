/**
 * Created by unio-raj on 4/7/17.
 */

"use strict";

let net = require('net');
let config = require('./../../config/config.json'),
    dataParsing = require('./device.data.parsing.js');


module.exports = function(){
    let tcp = net.createServer(function (socket) {
           
        socket.on('connect',function(){
        	console.log('successfully connected to tcp client');
        });

        socket.on('data', function (deviceData) {
            dataParsing.returningTheCompleteDataObject(socket,deviceData).then(function(value){
                console.log('data recived: ',value);
            }).catch(function (err) {
                console.log('error occure: ',err);
            });
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
