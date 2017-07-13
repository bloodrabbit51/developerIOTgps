/**
 * Created by unio-raj on 5/7/17.
 */

let deviceDataModel = require('../../models/device.data.schema.js');

exports.savingTheDataCommingFromDeviceToTheMongoDB = function(deviceData){
    let parsedDeviceData = deviceDataModel({
        
    });

    parsedDeviceData.save(function(err){
      if(err){
        console.log('error occure in saving the data: ',err.message);
      }else {
        console.log('data is saved succesfully');
      }
    });
};
