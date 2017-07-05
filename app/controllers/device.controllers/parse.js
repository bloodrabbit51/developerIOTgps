var parser = {};
var teltonika = require('./protocols/teltonika');
var _ = require('underscore');
var protocols = [teltonika];

parser.parse = function (socket, buffer)
{

    var provider;
    for (var i = 0; i < protocols.length; i++)
    {
        provider = protocols[i];

        var supported = -1; // not implemented
        try {
            supported = provider.canParse( buffer );
        } catch(ex) {
            console.log('protocol provider failure: ' + ex);
        }

        if (supported == -1) {

        }

        if (supported == true) {
            break;
        }
    }

    try {
        return provider.parse(socket, buffer);
    } catch(ex) {
        console.log('parsing failure: ' + ex);
    }

    

};
module.exports = parser;