var deviceDataModel = require('../../../models/dummy.data.schema.js');

exports.savingDeviceDataFromDatabase = function (req,res) {
	var obj = deviceDataModel({
                imei : req.body.imei,
                lat : req.body.lat,
                lon : req.body.long,
                fuel : req.body.fuel,
                rpm : req.body.rpm,
                speed : req.body.speed,
                hb : req.body.hb,
                ha : req.body.ha,
                tps : req.body.tps
        });

        obj.save(function(err) {
  if (err){
         res.json({
        status : success
  });
  }else{

  res.json({
        status : success
  });
}
});

};

exports.sendingDeviceDataFromDatabase = function (req,res) {
         deviceDataModel.find({}).
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
