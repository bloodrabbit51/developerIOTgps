"use strict";
let parser = {};
let teltonika = require('./protocols/teltonika');
let protocols = [teltonika];

parser.parse = function (socket, buffer) {
    let provider;
    for (let i = 0; i < protocols.length; i++) {
        try {
            provider = protocols[i];
            let supported = -1;
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
