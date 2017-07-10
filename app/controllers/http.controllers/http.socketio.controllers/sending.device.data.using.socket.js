/**
 * Created by unio-raj on 9/7/17.
 */


var io = require('socket.io')(require('../../../../server.js').server);


module.exports = function () {

    io.on('connection',function (socket) {
        console.log('socket.io connection succesfull');

        socket.emit('news',{ hello : 'world'});
    });

};


