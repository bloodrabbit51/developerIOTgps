/**
 * Created by unio-raj on 4/7/17.
 */

"use strict";

var net = require('net');
var config = require('./../../config/config.json');
var parser = require('./parse');


module.exports = function(){
    var tcp = net.createServer(function (socket) {

        var client = 'host ' + socket.remoteAddress + ':' + socket.remotePort;
        console.log('client address: ',client);
        
        socket.on('connect',function(){
        	console.log('successfully connected to tcp client');
        });
        socket.on('data', function (deviceData) {
            console.log('data recieved from device: ',deviceData);
            var parsedData = parser.parse(socket, deviceData);

            if (!parsedData) {  //  null || undefined
                log.error("Data wasn't parsed. Connection dropped.");
                socket.destroy(); //  release socket resources
                return;
            }

            var parsedMaps; // expected format - Array of Maps with extracted data values.
            if (_.isArray(parsedData)) {
                if (parsedData.length == 0) { // empty Array
                    log.info('Connection still opened, looking for next data packet.');
                    return;
                }
                parsedMaps = parsedData;
            }

            if (!parsedMaps) {
                log.error("Can't process parsed data. Connection dropped.");
                socket.destroy();
                return;                //  TODO:   keep connection opened, as there may be additional data ?
            }

            //  data packet fully processed.
            //  release socket asap.
            socket.end();

            try {
                //  TODO:   use 'ui:enabled' config option

                //  update UI in real-time
                //  TODO:   don't pass EVERY of coords to UI, but only LAST / LATEST one.
                for (var index = 0; index < parsedMaps.length; index++)
                {
                    var mapData = parsedMaps[index];
                    var deviceId = mapData['IMEI'];
            var fuel = mapData['fuel'];
            var rpm = mapData['rpm'];
            var tps = mapData['tps'];
            var state = mapData['state'];
            var speed = mapData['speed'];
            var speedobd = mapData['speedobd'];

                    if (deviceId) {
                        //  utcDate,utcTime
                        var utcDateTime = mapData['utcDateTime'];
                        var utcDate = mapData['utcDate'];
                        var utcTime = mapData['utcTime'];
                        var utcDate = new Date(mapData['utcDate']);
                        var utcTime = new Date(mapData['utcTime']);
                        var utcDateTime = new Date(parseInt(mapData['utcDate']) + parseInt(mapData['utcTime']));
            var date = new Date(mapData['utcDate']);
                        //log.debug('date: ' + utcDate + ' time: ' + utcTime);
                        //log.debug('date & time as Date: ' + utcDateTime); // OUTPUT: date & time as Date: 1377818379000
                        log.debug('date&time as String: ' + utcDateTime.toString()); // the same !

                        var lat = mapData['latitude'];
                        var lng = mapData['longitude'];
            var date = new Date(mapData['utcDateTime']);

            var text = '\r\n'+'  '+date+',  '+deviceId+',  '+lat+',  '+lng+',  '+fuel+',  '+rpm+',  '+tps+',  '+state+',  '+speed+',  '+speedobd;

            fs.appendFile('newdata.txt',text, function (err) {
                                if (err) 
                                        return console.log(err);
                                console.log('file is written');
                                });



            //connection.query('SELECT * from basic_data', function(err, rows, fields) {
            //  if (!err)
                //      console.log('The solution is: ', rows);
            //  else
                //      console.log('Error while performing Query.');
            //  });
            
            

                        var objUI = {
                            type: 'marker',
                            deviceId: deviceId,
                            utcDateTime: new Date(utcDateTime).toUTCString(),
                            altitude: mapData['altitude'], // Unit: meter
                            speed: mapData['speed'], // unit: km/hr
                            //speedKnots: mapData['speedKnots'], // unit: Knots
                            heading: mapData['heading'], // unit: degree
                            //reportType: mapData['reportType'], - see: tr-600_development_document_v0_7.pdf -> //4=Motion mode static report //5 = Motion mode moving report //I=SOS alarm report //j= ACC report
                            lat: lat,
                            lng: lng
                        };
                        io.emit('map message', objUI); // broadcasting using 'emit' to every socket.io client
                        //log.debug('gps position broadcasted -> map UI');
                    }
                }
            } catch (ex) {
                log.error('UI update failure: ' + ex);
            }

        });

        socket.on('close', function () {
            
        });

        socket.on('error', function (err) {
            
        });

    }).listen(config.tcp.port,function(){
    	console.log('tcp port had started listening at port number:',config.tcp.port);
    });
};