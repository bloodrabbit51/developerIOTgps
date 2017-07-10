/**
 * Created by unio-raj on 5/7/17.
 */

let deviceDataModel = require('../../models/device.data.schema.js');

exports.savingTheDataCommingFromDeviceToTheMongoDB = function(){
    let parsedDeviceData = deviceDataModel({

    });

    parsedDeviceData.save(function(err){
      if(err){
        console.log();
      }else {
        console.log();
      }
    });
};
