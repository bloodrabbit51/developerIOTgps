/**
 * Created by unio-raj on 6/7/17.
 */
"use strict";

/*
 *@author : Rohan Raj
 *funName : savingTheDataCommingFromDeviceToTheMongoDB
 *defination : this function is responcible of regenerating hash file
 *@param : deviceData is the parsed data
 *@return : it responce back to the called functions in faied or success responce.
 */

function convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray, startingIndexOfDataToBeFound, sizeOfDataToBeParsed) {
    
        let value = 0;
        for (let i = startingIndexOfDataToBeFound; i < (startingIndexOfDataToBeFound + sizeOfDataToBeParsed); i++) {
            value = (value * 256) + dataArray[i];
        }
        return value;
    
}

/*
 *@author : Rohan Raj
 *funName : savingTheDataCommingFromDeviceToTheMongoDB
 *defination : this function is responcible of regenerating hash file
 *@param : deviceData is the parsed data
 *@return : it responce back to the called functions in faied or success responce.
 */
//count = count+dataArray[count-1]*5
exports.returningTheCompleteDataObject = async function (socket, newDataArray) {
    var dataArray = ((new Buffer(newDataArray)).toJSON()).data;
    var count = 0;
    let completeParsedDataObject = {
        lognitude: convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray, 19, 4),
        latitude: convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray, 23, 4),
        altitude: convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray, 27, 2),
        angleofvehicle: convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray, 29, 2),
        satellite: convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray, 31, 1),
        speed: convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray, 32, 2),
        IOElements: {
            onebyteelement: ParsingOneByteData(dataArray.slice(37,count = 37+dataArray[36]*2)),
            twobyteelement: ParsingTwoByteData(dataArray.slice(count = count + 1  , count = count+dataArray[count-1]*3)),
            fourbyteelement: ParsingFourByteData(dataArray.slice(count = count + 1  , count = count+dataArray[count-1]*5))
        }
    };
	
    return await completeParsedDataObject;
};

/*
 *@author : Rohan Raj
 *funName : savingTheDataCommingFromDeviceToTheMongoDB
 *defination : this function is responcible of regenerating hash file
 *@param : deviceData is the parsed data
 *@return : it responce back to the called functions in faied or success responce.
 */

function ParsingOneByteData(dataArray) {
 
	return new Promise(function (resolve, reject) {
        var obj = {};
        for(let i = 0; i<dataArray.length; i=i+2) {
            switch (dataArray[i]) {
                case 1:
                    obj.ignition = dataArray[i+1];
                    break;
                case 240:
                    if(dataArray[i+1]){
                        obj.movement = "moving";
                    }else {
                        obj.movement = "not moving";
                    }
                    break;
                case 80:
                    switch (dataArray[i+1]){
                        case 0:
                            obj.datamode = "home on stop";
                            break;
                        case 1:
                            obj.datamode = "home on move";
                            break;
                        case 2:
                            obj.datamode = "roaming on stop";
                            break;
                        case 3:
                            obj.datamode = "roaming on move";
                            break;
                        case 4:
                            obj.datamode = "unknown on stop";
                            break;
                        case 5:
                            obj.datamode = "unknown on move";
                            break;
                        default:
                    }
                    break;
                case 21:
                    obj.gsmsignal = dataArray[i+1];
                    break;
                case 200:
                    if(dataArray[i+1]){
                        obj.deepsleep = "deep sleep mode";
                    }else {
                        obj.deepsleep = "not deep sleep mode";
                    }
                    break;
                case 155:
                    if(dataArray[i+1]){
                        obj.geofencezone01 = "target entered zone";
                    }else {
                        obj.geofencezone01 = "target left the zone";
                    }
                    break;
                case 156:
                    if(dataArray[i+1]){
                        obj.geofencezone02 = "target entered zone";
                    }else {
                        obj.geofencezone02 = "target left the zone";
                    }
                    break;
                case 157:
                    if(dataArray[i+1]){
                        obj.geofencezone03 = "target entered zone";
                    }else {
                        obj.geofencezone03 = "target left the zone";
                    }
                    break;
                case 158:
                    if(dataArray[i+1]){
                        obj.geofencezone04 = "target entered zone";
                    }else {
                        obj.geofencezone04 = "target left the zone";
                    }
                    break;
                case 159:
                    if(dataArray[i+1]){
                        obj.geofencezone05 = "target entered zone";
                    }else {
                        obj.geofencezone05 = "target left the zone";
                    }
                    break;
                case 175:
                    if(dataArray[i+1]){
                        obj.autogeofence = "target entered zone";
                    }else {
                        obj.autogeofence = "target left the zone";
                    }
                    break;
                case 250:
                    if(dataArray[i+1]){
                        obj.trip = "trip start";
                    }else {
                        obj.trip = "trip stop";
                    }
                    break;
                case 255:

                    break;
                case 251:
                    if(dataArray[i+1]){
                        obj.excessiveideling = "Ideling Start";
                    }else {
                        obj.excessiveideling = "Ideling Stop";
                    }
                    break;
                case 253:
                    switch (dataArray[i+1]){
                        case 1:
                            obj.greendrivingtype = "harsh acceleration";
                            break;
                        case 2:
                            obj.greendrivingtype = "harsh breaking";
                            break;
                        case 3:
                            obj.greendrivingtype = "harsh cornering";
                            break;
                        default:
                    }
                    break;
                case 252:
                    if(dataArray[i+1]){
                        obj.unplugdetection = "plugged";
                    }else {
                        obj.unplugdetection = "unplugged";
                    }
                    break;
                case 247:
                    if(dataArray[i+1]){
                        obj.crashdetected = "crash detected";
                    }else{
                        obj.crashdetected = "crash not detected";
                    }
                    break;
                case 248:
                    if(dataArray[i+1]){
                        obj.alarm = "alarm mode activated";
                    }else {
                        obj.alarm = "alarm mode deactivated";
                    }
                    break;
                case 254:

                    break;
                case 249:
                    if(dataArray[i+1]){
                        obj.jamming = "Jamming start";
                    }else {
                        obj.jamming = "Jamming Ends";
                    }
                    break;

                default:

            }
        }
        resolve(obj);
    });
}

/*
 *@author : Rohan Raj
 *funName : savingTheDataCommingFromDeviceToTheMongoDB
 *defination : this function is responcible of regenerating hash file
 *@param : deviceData is the parsed data
 *@return : it responce back to the called functions in faied or success responce.
 */

function ParsingTwoByteData(dataArray) {
    return new Promise(function (resolve, reject) {
        var obj = {};
        for(let i = 0; i<dataArray.length; i=i+3) {        
switch (dataArray[i]) {
                case 181:

                    break;
                case 182:

                    break;
                case 66:
                  obj.externalvoltage = convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,i+1,2);
                    break;
                case 24:
                  obj.gpsspeed = convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,i+1,2);
                    break;
                case  205:
                  obj.cellid = convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,i+1,2);
                    break;
                case 206:
                   obj.gsmareacode = convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,i+1,2);
                    break;
                case 67:
                    obj.batteryvoltage = convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,i+1,2);
                    break;
                case 68:
                    obj.batterycurrent = convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,i+1,2);
                    break;
                default:

            }
        }
        resolve(obj);
    });
}

/*
 *@author : Rohan Raj
 *funName : savingTheDataCommingFromDeviceToTheMongoDB
 *defination : this function is responcible of regenerating hash file
 *@param : deviceData is the parsed data
 *@return : it responce back to the called functions in faied or success responce.
 */

function ParsingFourByteData(dataArray) {
    return new Promise(function (resolve, reject) {
        var obj = {};
        for(let i = 0; i<dataArray.length; i=i+5) {
            switch (dataArray[i]) {
                case 16:
                    obj.totaldistance = convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,(i+1),4);
                    break;
                case 199:
                      obj.tripdistance = convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,(i+1),4);
                    break;
                case 241:
                    obj.activitygsmoperator = convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,(i+1),4);
                    break;
                default:

            }
        }
	resolve(obj);
    });
}

/*
 *@author : Rohan Raj
 *funName : savingTheDataCommingFromDeviceToTheMongoDB
 *defination : this function is responcible of regenerating hash file
 *@param : deviceData is the parsed data
 *@return : it responce back to the called functions in faied or success responce.
 */

function ParsingEightByteData() {
    return new Promise(function (resolve, reject) {

    });
}

 /*
 *@author : Rohan Raj
 *funName : savingTheDataCommingFromDeviceToTheMongoDB
 *defination : validation of IMEI number should be done
 *@param : deviceData is the parsed data
 *@return : it responce back to the called functions in faied or success responce.
 */

exports.validatingDataPackets = function (deviceIMEIDataPacket) {
    return new new Promise(function (resolve, reject) {

        if (true) {
            resolve(0x01);
        } else {
            reject(0x00);
        }

    });
};
