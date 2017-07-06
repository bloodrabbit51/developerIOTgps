"use strict";
var parser = {};
var teltonika = require('./protocols/teltonika');
var protocols = [teltonika];

parser.parse = function (socket, buffer) {
    var provider;
    for (var i = 0; i < protocols.length; i++) {
        try {
            provider = protocols[i];
            var supported = -1;
            try {
                supported = provider.canParse(buffer);
            } catch (ex) {
                console.log('protocol provider failure: ' + ex);
            }
        } catch (exception) {
            console.log('error', exception);
        }
        try {
            return provider.parse(socket, buffer);
        } catch (ex) {
            console.log('parsing failure: ' + ex);
        }
    }
};

module.exports = parser;
