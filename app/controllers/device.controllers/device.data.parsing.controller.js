/**
 * Created by unio-raj on 6/7/17.
 */
"use strict";

function  convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray ,startingIndexOfDataToBeFound ,sizeOfDataToBeParsed) {
    return new Promise(resolve=>{
       let value = 0;
       for(let i = startingIndexOfDataToBeFound ;i <= (startingIndexOfDataToBeFound + sizeOfDataToBeParsed -1) ; i++){
           value = (value*256) + dataArray[i];
       }
       resolve(value);
    });
}

exports.returningTheCompleteDataObject = async function(socket,dataArray){
    let completeParsedDataObject = {
        logitude : convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,19,4),
        latitude : convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,23,4),
        altitude : convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,27,2),
        angle_of_vehicle : convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,29,2),
        satellite : convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,31,1),
        gps_speed : convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,32,2)
    };
    return await completeParsedDataObject;
};



function searchingForTheIOElementsInArray(dataArray ,searchBit ,sizeOfDataElement){
    return new Promise(resolve=>{

    });
}
/*
* validation of IMEI number should be done
*/
exports.validatingDataPackets = function(deviceIMEIDataPacket){
  return new new Promise(function(resolve, reject) {

    if(true){
      resolve(0x01);
    }else {
      reject(0x00)
    }

  });
};
