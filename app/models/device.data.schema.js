let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*
 *@author : Rohan Raj
 *funName : savingTheDataCommingFromDeviceToTheMongoDB
 *defination : this function is responcible of regenerating hash file
 *@param : deviceData is the parsed data
 *@return : it responce back to the called functions in faied or success responce.
 */
let deviceDataSchema = new Schema({
    data: {
        type: String,
        default: ''
    },
    created: {
        type: Date,
        default: Data.now
    }
});
// let deviceDataSchema = new Schema({
//     IMEI: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     data: {
//         gpslatitude: {
//             type: String,
//             default: ''
//         },
//         gpslongitude: {
//             type: String,
//             default: ''
//         },
//         gpsaltitude: {
//             type: String,
//             default: ''
//         },
//         gpsspeed: {
//             type: String,
//             default: ''
//         },
//         gpsangleofvehicle: {
//             type: String,
//             default: ''
//         },
//         gpssatellite: {
//             type: String,
//             default: ''
//         },
//         gpsspeed: {
//             type: String,
//             default: ''
//         },
//         onebytedata: {
//             ignition: {
//                 type: String,
//                 default: ''
//             },
//             movement: {
//                 type: String,
//                 default: ''
//             },
//             datamode: {
//                 type: String,
//                 default: ''
//             },
//             gsmsignal: {
//                 type: String,
//                 default: ''
//             },
//             deepsleep: {
//                 type: String,
//                 default: ''
//             },
//             geofencezone01: {
//                 type: String,
//                 default: ''
//             },
//             geofencezone02: {
//                 type: String,
//                 default: ''
//             },
//             geofencezone03: {
//                 type: String,
//                 default: ''
//             },
//             geofencezone04: {
//                 type: String,
//                 default: ''
//             },
//             geofencezone05: {
//                 type: String,
//                 default: ''
//             },
//             autogeofence: {
//                type: String,
//                 default: '' 
//             },
//             trip:{
//                 type: String,
//                 default: ''
//             },
//             excessiveideling: {
//                 type: String,
//                 default: ''
//             },
//             greendrivingtype: {
//                 type: String,
//                 default: ''
//             },
//             unplugdetection: {
//                 type: String,
//                 default: ''
//             },
//             crashdetected: {
//                 type: String,
//                 default: ''
//             },
//             alarm: {
//                 type: String,
//                 default: ''
//             },
//             jamming: {
//                 type: String,
//                 default: ''
//             }
//         },
//         twobytedata: {
//             externalvoltage:{
//                 type: String,
//                 default: ''
//             },
//             gpsspeed: {
//                 type: String,
//                 default: ''
//             },
//             cellid: {
//                 type: String,
//                 default: ''
//             },
//             gsmareacode: {
//                 type: String,
//                 default: ''
//             },
//             batteryvoltage: {
//                 type: String,
//                 default: ''
//             },
//             batterycurrent: {
//                 type: String,
//                 default: ''
//             }
//         },
//         fourbytedata: {
//             totaldistance: {
//                 type: String,
//                 default: ''
//             },
//             tripdistance: {
//                 type: String,
//                 default: ''
//             },
//             activitygsmoperator: {
//                 type: String,
//                 default: ''
//             }
//         }
//     }
// });

let deviceData = mongoose.model('devicedata', deviceDataSchema);
module.exports = deviceData;

