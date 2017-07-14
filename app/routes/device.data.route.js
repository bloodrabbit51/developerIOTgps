/**
 * Created by unio-raj on 4/7/17.
 */

var express = require('express'),
    router = express.Router(),
    devicedatacontroller = require('../controllers/http.controllers/http.restfull.api.controllers/device.data.controller.js'),
    livetrackingdatacontroller = require('../controllers/http.controllers/http.socketio.controllers/sending.device.data.using.socket.js'),
    sendinuifiles = require('../controllers/http.controllers/http.restfull.api.controllers/serving.the.ui.controller.js');


router.get('/getuserdetail',devicedatacontroller.sendingDeviceDataFromDatabase);

router.get('/getlivetracking',livetrackingdatacontroller.sendingDeviceDataUsingSocket);

router.get('/index.html',sendinuifiles.sendingUIFiles);

module.exports = router;