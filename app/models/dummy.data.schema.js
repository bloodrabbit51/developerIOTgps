let mongoose = require('mongoose'),
    Schema = mongoose.Schema;


let deviceDataSchema = new Schema({
    data: {
        type: Object,
        required: true
        },
    created: {
        type: Date,
        default: Date.now
    }
});


let deviceData = mongoose.model('dummydata', deviceDataSchema);
module.exports = deviceData;