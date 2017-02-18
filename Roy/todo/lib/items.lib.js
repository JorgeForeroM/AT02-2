var request = require('superagent');
require('superagent-proxy')(request);
var tokenConfig = require('../config/token.json');
var generalConfig = require('../config/credentials.json');
var endpoints = require('../resources/endpoints.json');
var tokenGenerator = require('./helpers/TokenGenerator');


var url = generalConfig.url;
var endpoint = endpoints.item;

var header = {Token: tokenBody.TokenString};

function createItem(itemJson, callback) {
    request
        .post(url + endpoint + '.json')
        .proxy(generalConfig.proxy)
        .set(header)
        .send(itemJson)
        .end(function (err, res) {
            callback(err, res);
        });
}

function modifyItem(itemId, newJson, callback) {
    request
        .put(url + endpoint + '/' + itemId + '.json')
        .proxy(generalConfig.proxy)
        .set(header)
        .send(newJson)
        .end(function (err, res) {
            callback(err, res);
        });
}

function deleteItem(itemId, callback) {
    request
        .del(url + endpoint + '/' + itemId + '.json')
        .proxy(generalConfig.proxy)
        .set(header)
        .end(function (err, res) {
            callback(err, res);
        });
}


exports.createItem = createItem;
exports.modifyItem = modifyItem;
exports.deleteItem = deleteItem;