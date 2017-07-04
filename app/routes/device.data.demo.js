/**
 * Created by unio-raj on 4/7/17.
 */

var express = require('express');
var router = express.Router();
var devicedatacontroller = require('../controllers/http.controllers/device.data.controller.js');

router.get('/',function (req,res) {
    res.send("hello world");
});

module.exports = router;