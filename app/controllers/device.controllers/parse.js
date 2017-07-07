"use strict";
let parser = {};
let teltonika = require('./protocols/teltonika');
let protocols = [teltonika];
let parseData = require('./device.data.parsing.js');

exports.parse =  function (socket, buffer) {
   return new Promise(function (resolve) {


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
                parseData(socket,buffer).then(function (parseddata) {
                   resolve(parseddata);
                }).catch(function (error) {
                    resolve(error);
                });
            } catch (ex) {
                console.log('parsing failure: ' + ex);
            }
        }
    });
};

