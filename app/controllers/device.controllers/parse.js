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
            supported = provider.canParse(buffer);
		console.log('hii ',supported);
            if (supported == -1) {

            }
           
        } catch (exception) {
            console.log('error', exception);
        }
        try {
		console.log('hi');
            return provider.parse(socket, buffer);
        } catch (ex) {
            console.log('parsing failure: ' + ex);
        }
    }
};
module.exports = parser;
