

let deviceDataModel = require('../../models/device.data.schema.js');
/*
 *@author : Rohan Raj
 *funName : savingTheDataCommingFromDeviceToTheMongoDB
 *defination : this function is responcible of regenerating hash file
 *@param : deviceData is the parsed data
 *@return : it responce back to the called functions in faied or success responce.
 */
exports.savingTheDataCommingFromDeviceToTheMongoDB = function(deviceData){
    return new Promise(function(resolve,reject){
    	let parsedDeviceData = deviceDataModel(deviceData);

    parsedDeviceData.save(function(err){
      if(err){
       reject({
       	status : false,
       	message : `error occure while storing the data that are comming from device ${err.message}`
       }); 
      }else {
        resolve({
        	status : true,
//        	message : `storage of data to the database is successfull that are comming from following IMEI no ${}`
        });
      }
    });
    });
    
};
