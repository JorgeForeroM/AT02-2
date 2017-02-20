/**
 * Created by Administrator on 2/18/2017.
 */
var request = require('superagent');
require('superagent-proxy')(request);
var config = require('../config.json');
var header = require('./header');

var account = config.account;
var password = config.password;
var service = config.service;

function emptyRecycleBin(callback) {

    var endpoint = service + config.filters + '/-4/' + config.items + config.type;
    request
        .del(endpoint)
        .proxy(config.proxy)
        .set(header)
        .end(function (err, res) {
            callback(err, res);
        });
}

function getDoneFilters(callback) {
    var endpoint = service + config.filters + config.inbox + config.doneitems + config.type;
    request
        .get(endpoint)
        .set(header)
        .auth(account, password)
        .end(function (err, res) {
            callback(err, res);
        });
}


function getItems(callback) {
    var endpoint = service + config.filters + config.inbox + config.items + config.type;
    request
        .get(endpoint)
        .proxy(config.proxy)
        .set(header)
        .end(function (err, res) {
            callback(err, res);
        });
}

function getFilters(callback) {
    var endpoint = service + config.filters + config.type;
    request
        .get(endpoint)
        .proxy(config.proxy)
        .set(header)
        .end(function (err, res) {
            callback(err, res);
        });
}

exports.emptyRecycleBin = emptyRecycleBin;
exports.getDoneFilters = getDoneFilters;
exports.getItems = getItems;
exports.getFilters = getFilters;