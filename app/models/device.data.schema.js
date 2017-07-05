var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var deviceDataSchema = new Schema({
    IMEI : {
        type: String,
        default:''
    },
    latitude:{
        type:String,
        default:''
    },
    longitude:{
        type:String,
        default:''
    },
    speed:{
        type:String,
        default:''
    },
    angle:{
        type:String,
        default:''
    },
    altitude:{
        type:String,
        default:''
    },
    ignition:{
        type:String,
        default:''
    },
    dtc:{
        type:String,
        default:''
    },
    engine_rpm:{
        type:String,
        default:''
    },
    vehicle_speed:{
        type:String,
        default:''
    },
    fuel:{
        type:String,
        default:''
    },
    throttleposition:{
        type:String,
        default:''
    },
    engineload:{
        type:String,
        default:''
    },
    created:{
        type: Date,
        default: Date.now
    }
});

var deviceData = mongoose.model('devicedata',deviceDataSchema);
module.exports = deviceData;