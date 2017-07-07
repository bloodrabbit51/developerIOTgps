/**
 * Created by unio-raj on 6/7/17.
 */


function  convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray ,startingIndexOfDataToBeFound ,sizeOfDataToBeParsed) {
    return new Promise(resolve=>{
       let value = 0;
       for(let i = 0;i < (startingIndexOfDataToBeFound + sizeOfDataToBeParsed -1);i++){
           value = (value*256) + dataArray[i];
       }
       resolve(value);
    });
}

async function returningTheCompleteDataObject(socket,dataArray){
    let completeParsedDataObject = {
        logitude : convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray,19,4),
        latitude : convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray),
        altitude : convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray),
        gps_speed : convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray),
        angleOfVehicle: convertingTheSingleDataIntoDecimalFormatToHexaDecimalToAgainDecimal(dataArray),
    };
    return await completeParsedDataObject;
}

function searchingForTheIOElementsInArray(dataArray ,searchBit ,sizeOfDataElement){
    return new Promise(resolve=>{

    });
}