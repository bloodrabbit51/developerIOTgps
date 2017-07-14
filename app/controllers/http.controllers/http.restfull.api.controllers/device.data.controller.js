/**
 * Created by unio-raj on 4/7/17.
 */

var deviceDataModel = require('../../../models/device.data.schema.js');

exports.sendingDeviceDataFromDatabase = function (req,res) {
	 deviceDataModel.find({created : {$gte : new Date("2017-07-10T13:31:36.270Z").toISOString()}}).
        select('data').
        exec(function(err,data){
        	if(err)
        		res.status(400).json({
        			status : false,
        			message : err.message
        		});

        	res.status(200).json({
        		status : true,
        		message : data
        	});
        });    
};
