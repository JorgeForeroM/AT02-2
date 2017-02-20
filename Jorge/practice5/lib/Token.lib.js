/**
 * Created by Administrator on 2/20/2017.
 */
var request = require('superagent');
require('superagent-proxy');
var config = require('../config.json');
var logger = require('../logger/logger').getLogger('project');
var token = require('./token');
var header = require('./header');

var account = config.account;
var password = config.password;
var service = config.service;

function getToken(callback) {
    var endpoint = service + config.token + config.type;

    if (!token.isValid()) {
        request
            .get(endpoint)
            .auth(account, password)
            .end(function (err, res) {
                //clonning the token returned from the request
                Object.assign(token, res.body);
                console.log(res.body.TokenString);
                //assigning to the header the token String
                header.Token = token.TokenString;

                callback(err, res);
            });
    } else {
        callback(null, token);
    }
    ;
}

exports.getToken = getToken;