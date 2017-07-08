"use strict";
let parser = {};
let teltonika = require('./protocols/teltonika');
let protocols = [teltonika];
//let parseData = require('./device.data.parsing.js');

exports.parse =  function (socket, buffer) {
   return new Promise(function (resolve ,reject) {
        let provider;
        for (let i = 0; i < protocols.length; i++) {
            try {
                provider = protocols[i];
                let supported = -1;
                try {
                    supported = provider.canParse(buffer);
                } catch (ex) {
                    reject(ex);
                }
            } catch (exception) {
                reject(exception);
            }
            try {
              resolve(protocols.parse(socket,buffer));
            } catch (ex) {
                reject(ex);
            }
        }
    });
};
