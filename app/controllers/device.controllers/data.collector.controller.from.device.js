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

<<<<<<< HEAD

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
=======
        socket.on('data', function (deviceData) {
	//console.log(JSON.strigify(dieviceData,null,2));
	var buf = new Buffer(deviceData);
	console.log(buf.toJSON().data.length);  
	if(buf.toJSON().data.length == 17){	
socket.write(String.fromCharCode(0x01));  }else{        
dataParsing.returningTheCompleteDataObject(socket,deviceData).then(function(value){
                console.log('data recived: ',value);
            }).catch(function (err) {
                console.log('error occure: ',err);
            });
}
        });
>>>>>>> 92211cab992472879a5bb0aac067f008a3b45e8c


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
