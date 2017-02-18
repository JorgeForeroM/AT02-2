var tokenConfig = require('../../config/token.json');
var generalConfig = require('../../config/credentials.json');
var requester = require('superagent');

require('superagent-proxy')(requester);
var fileName = 'config/token.json';
var expirationDate = tokenConfig.ExpirationTime;


global.tokenBody = {TokenString:"cf924729bb0242049b97ca8336fbd4c3",UserEmail:"Roy.Rodriguez@fundacion-jala.org",ExpirationTime:"/Date(1487439005590)/"};

function generateToken(callback) {
    requester.get(generalConfig.url + 'authentication/token.json')
        .auth(generalConfig.username, generalConfig.password)
        .end(function (err, res) {
            callback(err, res.body.TokenString);
        });
}

exports.generateToken = generateToken;