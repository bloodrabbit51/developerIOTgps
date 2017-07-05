var parser = {};
var teltonika = require('./protocols/teltonika');
<<<<<<< HEAD
=======
var _ = require('underscore');
>>>>>>> 00267b0db7c7326fc597eee580128e2db95412cc
var protocols = [teltonika];

parser.parse = function (socket, buffer)
{

    var provider;
    for (var i = 0; i < protocols.length; i++)
    {
<<<<<<< HEAD
        provider = protocols[i];     
        var supported = -1; 
      try {
=======
        provider = protocols[i];

        var supported = -1; // not implemented
        try {
>>>>>>> 00267b0db7c7326fc597eee580128e2db95412cc
            supported = provider.canParse( buffer );
        } catch(ex) {
            console.log('protocol provider failure: ' + ex);
        }
<<<<<<< HEAD
=======

        if (supported == -1) {

        }

>>>>>>> 00267b0db7c7326fc597eee580128e2db95412cc
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