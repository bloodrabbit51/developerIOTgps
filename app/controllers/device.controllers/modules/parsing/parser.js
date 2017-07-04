var _ = require('underscore');
var log = require('../log')(module);
var globalsat = require('./protocols/globalsat');
var teltonika = require('./protocols/teltonika');

var parser = {};
module.exports = parser;


var protocols = [globalsat, teltonika]; //TODO: add more protocol modules here

parser.parse = function (socket, buffer)
{

    var provider;
    for (var i = 0; i < protocols.length; i++)
    {
        provider = protocols[i];
        //log.debug('protocol: ' + i + ' provider: ' + provider);

        var supported = -1; // not implemented
        try {
            supported = provider.canParse( buffer );
        } catch(ex) {
            log.error('protocol provider failure: ' + ex);
        }
        //log.debug('does provider understand the protocol ? ' + supported);
        if (supported == -1) {
            //log.debug('method canParse() not implemented.');
        }

        //  right now, just using the FIRST provider which claims it can parse.
        if (supported == true) {
            break;
        }

        //  TODO:   arrange parsing try if no canParse() methods found - just try using parse() method directly.
    }

    try {
        return provider.parse(socket, buffer);
    } catch(ex) {
        log.error('parsing failure: ' + ex);
    }

    

};
