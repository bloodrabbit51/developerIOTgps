/**
 * Created by unio-raj on 4/7/17.
 */

"use strict";

let net = require('net');
let config = require('./../../config/config.json'),
    deviceDataParsing = require('./device.data.parsing.controller.js'),
    deviceDataModel = require('../../models/device.data.schema.js');


module.exports = function () {
    let tcp = net.createServer(function (socket) {


        socket.on('connect', function () {
            console.log('successfully connected to tcp client');
        });


        socket.on('data', function (deviceData) {

            var buf = new Buffer(deviceData);
            console.log(buf.toJSON().data.length);
            if (buf.toJSON().data.length == 17) {
                socket.write(String.fromCharCode(0x01));
            } else {
                deviceDataParsing.returningTheCompleteDataObject(socket, deviceData).then(function (value) {

                }).catch(function (err) {
                    console.log('error occure: ', err);
                });
            }
        });


        socket.on('close', function () {
            console.log('tcp connection closed');
        });


        socket.on('error', function (err) {
            console.log('error in tcp socket connection:', err);
        });


    }).listen(config.tcp.port, function () {
        console.log('tcp port had started listening at port number:', config.tcp.port);
    });
};
