let parser = {};
let deviceDataModel = require('../../../models/device.data.schema.js');


parser.canParse = function (buffer) {
    if (!Buffer.isBuffer(buffer)) {
        console.log("Data packet is not of Buffer type.");
        return false;
    }

    if (buffer.length == 17) {
        if (buffer[0] == 0 && buffer[1] == 15) {
            return true;
        } else {
            return false;
        }
    }

    if (buffer.length <= 12) {
        console.log("Data packet is too short. Giving up.");
        return false;
    }

    if (buffer[0] == 0 && buffer[1] == 0 && buffer[2] == 0 && buffer[3] == 0) {

    } else {

        return false;
    }


    let lengthAVL = buffer.readUInt32BE(4);
    if ((4 + 4 + lengthAVL + 4) === buffer.length) {

        return true;
    }
    return false;
};


parser.parse = function (socket, buffer) {
    if (buffer.length == 17) {
        if (buffer[0] == 0 && buffer[1] == 15) {
            return parseInitPacket(socket, buffer);
        } else {
            return null;
        }
    }

    if (buffer.length > 12) {
        return parseDataPacket(socket, buffer);
    }
};


function parseInitPacket(socket, buffer) {
    let imei = buffer.toString('ascii').substr(2);
    socket.device_imei = imei; // keep device's IMEI (ID) in socket connection
    socket.write(String.fromCharCode(0x01)); // reply '1' to device, to indicate connection has been initialized.
    console.log("Session initialized with device_imei: " + socket.device_imei);
    return []; // return value must be Array, otherwise server will close socket connection, and session data will be lost.
}


function parseDataPacket(socket, data) {
    let propName = 'device_imei';

    if (!socket.hasOwnProperty(propName)) {
        console.log("Socket's property '" + propName + "' undefined. Procession stopped.");
        socket.write(0); // reply '0' to deny session.
        // here, socket is still open.
        return;
    }

    if (data instanceof Buffer) {
        buf = data;
    } else {
        buf = stringToBytes(data);
    }
    let gps = [];

    let sizeAVL = bytesToInt(buf, 4, 4);

    let rCRC = bytesToInt(buf, buf.length - 4, 4);

    let cCRC = crc16_teltonika(buf, 8, sizeAVL);

    let i = 8;
    //ccrc will not equal to rcrc when there is data loss

    if (sizeAVL == buf.length - 4 * 3 && rCRC == cCRC) {
        let codec = bytesToInt(buf, i, 1);
        i++;
        let recs = bytesToInt(buf, i, 1);
        i++;
        console.log(codec, recs);

        let ACC = 1;
        let DOOR = 2;
        let Analog = 4;
        let GSM = 21;
        let RPM = 6;
        let VOLTAGE = 7;
        let GPSPOWER = 8;
        let TEMPERATURE = 9;
        let ODOMETER = 16;
        let STOP = 9;
        let TRIP = 28;
        let IMMOBILIZER = 29;
        let AUTHORIZED = 30;
        let GREEDRIVING = 253;
        let OVERSPEED = 33;
        let TPS = 7;
        let SPEED = 8;
        let ONE = 76;
        let TWO = 77;
        let THREE = 79;
        let FOUR = 71;
        if (codec == 0x08) {
            //for (let n = 0; n < 1; n++) {
            let position = {};

            position.timestamp = bytesToInt(buf, i, 8);
            i += 8;

            position.preority = bytesToInt(buf, i, 1);
            i++;

            position.lng = bytesToInt(buf, i, 4) / 10000000.0;
            i += 4;

            position.lat = bytesToInt(buf, i, 4) / 10000000.0;
            i += 4;

            position.alt = bytesToInt(buf, i, 2);
            i += 2;

            position.dir = bytesToInt(buf, i, 2);
            position.direction = 0;
            i += 2;

            if (position.dir < 90)
                position.direction = 1;
            else if (position.dir == 90)
                position.direction = 2;
            else if (position.dir < 180)
                position.direction = 3;
            else if (position.dir == 180)
                position.direction = 4;
            else if (position.dir < 270)
                position.direction = 5;
            else if (position.dir == 270)
                position.direction = 6;
            else if (position.dir > 270)
                position.direction = 7;

            position.satellite = bytesToInt(buf, i, 1);
            i++;

            position.status = "Na";
            position.alarm = "Na";
            position.fuel = "Na";
            position.rpm = "Na";
            position.tps = "Na";
            position.state = "Na";
            position.speedobd = "Na";
            position.one = "Na";
            position.two = "Na";
            position.three = "Na";
            position.four = "Na";

            if (position.satellite >= 3)
                position.status = "A";
            else
                position.status = "L";

            position.speed = bytesToInt(buf, i, 2);
            i += 2;

            position.ioEvent = bytesToInt(buf, i, 1);
            i++;

            position.ioCount = bytesToInt(buf, i, 1);
            i++;

            {
                let cnt = bytesToInt(buf, i, 1);
                i++;
                for (let j = 0; j < cnt; j++) {
                    let id = bytesToInt(buf, i, 1);
                    i++;
                    //Add output status
                    switch (id) {
                        case SPEED: {
                            let value = bytesToInt(buf, i, 1);
                            position.speedobd = '' + value;
                            i++;
                            break;
                        }
                        case TPS: {
                            let value = bytesToInt(buf, i, 1);

                            position.tps = '' + value;
                            i++;
                            break;
                        }
                        case GSM: {
                            let value = bytesToInt(buf, i, 1);

                            console.log('gsm gsm gsm : ' + value);
                            i++;

                            break;
                        }
                        case STOP: {
                            let value = bytesToInt(buf, i, 1);
                            position.fuel = '' + value;
                            log.debug('Fuel level value : ' + value);
                            i++;
                            break;
                        }
                        case IMMOBILIZER: {
                            let value = bytesToInt(buf, i, 1);
                            position.alarm = value == 0 ? "Activate Anti-carjacking success" : "Emergency release success";
                            i++;
                            break;
                        }
                        case GREEDRIVING: {
                            let value = bytesToInt(buf, i, 1);
                            switch (value) {
                                case 1: {
                                    position.state = "Harsh accleration !!";
                                    break;
                                }
                                case 2: {
                                    position.state = "Harsh braking !!";
                                    break;
                                }
                                case 3: {
                                    position.state = "Harsh cornering !!";
                                    break;
                                }
                                default:
                                    break;
                            }
                            i++;
                            break;
                        }
                        default: {
                            i++;
                            break;
                        }
                    }

                }
            }

            //read 2 byte
            {
                let cnt = bytesToInt(buf, i, 1);
                i++;
                for (let j = 0; j < cnt; j++) {
                    let id = bytesToInt(buf, i, 1);
                    i++;

                    switch (id) {
                        case Analog: {
                            let value = bytesToInt(buf, i, 2);
                            if (value < 12)
                            //position.alarm += string.Format("Low voltage", value);
                                i += 2;
                            break;
                        }
                        case RPM: {
                            let value = bytesToInt(buf, i, 2);

                            position.rpm = '' + value;
                            i += 2;
                            break;
                        }
                        default: {
                            i += 2;
                            break;
                        }

                    }
                }
            }

            //read 4 byte
            {
                let cnt = bytesToInt(buf, i, 1);
                i++;
                for (let j = 0; j < cnt; j++) {
                    let id = bytesToInt(buf, i, 1);
                    i++;

                    switch (id) {
                        case TEMPERATURE: {
                            let value = bytesToInt(buf, i, 4);
                            //position.alarm += string.Format("Temperature {0}", value);
                            i += 4;
                            break;
                        }
                        case ODOMETER: {
                            let value = bytesToInt(buf, i, 4);
                            position.mileage = value;
                            i += 4;
                            break;
                        }
                        default: {
                            i += 4;
                            break;
                        }
                    }
                }
            }

            {
                let cnt = bytesToInt(buf, i, 1);
                i++;
                for (let j = 0; j < cnt; j++) {
                    let id = bytesToInt(buf, i, 1);
                    i++;

                    switch (id) {
                        case ONE: {
                            let value = bytesToInt(buf, i, 8);
                            //position.alarm += string.Format("Temperature {0}", value);
                            position.one = '' + value;
                            i += 8;
                            break;
                        }
                        case TWO: {
                            let value = bytesToInt(buf, i, 8);
                            position.two = '' + value;
                            i += 8;
                            break;
                        }
                        case THREE: {
                            let value = bytesToInt(buf, i, 8);
                            position.three = '' + value;
                            i += 8;
                            break;
                        }
                        case FOUR: {
                            let value = bytesToInt(buf, i, 8);
                            position.four = '' + value;
                            i += 8;
                            break;
                        }
                        default: {
                            i += 8;
                            break;
                        }
                    }
                }
            }


            let imei = socket.device_imei;

            if (position.lng != 0 || position.lat != 0) {
                let deviceData = deviceDataModel({
                    IMEI: imei,
                    latitude: position.lat,
                    longitude: position.lng,
                    altitude: position.alt,
                    vehicle_speed: position.speed,
                    fuel: position.fuel,
                    engine_rpm: position.rpm
                });
                gps.push(deviceData);
                console.log(deviceData);

                deviceData.save(function (err) {
                    if (err) {
                        console.log("error in data insertion", err);
                    } else {
                        console.log('insertion of data in database successfull');
                    }
                });
            }
            //}
        }
    }
    console.log('data is here:', gps);
    return null;
}

function crc16_teltonika(data, p, size) {
    let crc16_result = 0x0000;
    for (let i = p; i < p + size; i++) {
        let val = 1 * (data[i]); // +i);
        crc16_result ^= val;
        for (let j = 0; j < 8; j++) {
            crc16_result = crc16_result & 0x0001 ? (crc16_result >> 1) ^ 0xA001 : crc16_result >> 1;
        }
    }
    return crc16_result;
}

function bytesToInt(array, p, size) {
    let value = 0;
    for (let i = p; i <= p + size - 1; i++) {
        value = (value * 256) + array[i];
    }
    return value;
}


function stringToBytes(str) {
    let bytes = [];
    for (let i = 0; i < str.length; ++i) {
        let charCode = str.charCodeAt(i);
        bytes.push(charCode);
    }
    return bytes;
}
function newParsingfunction() {
    //converting data into bytes
    let bufferData;
    let postion = {};
    if (data instanceof Buffer) {
        bufferData = data;
    } else {
        bufferData = stringToBytes(data);
    }
    /*
     * getting the data
     * */


}
module.exports = parser;
