/**
 * Created by Administrator on 2/18/2017.
 */
var request = require('superagent');
require('superagent-proxy')(request);
var config = require('../config.json');

var account = config.account;
var password = config.password;
var service = config.service;


function create(itemJson, callback) {
    var endpoint = service + config.items + config.type;

    request
        .post(endpoint)
        .proxy(config.proxy)
        .auth(account, password)
        .send(itemJson)
        .end(function (err, res) {

            callback(err, res);
        });
};

function del(itemId, callback) {
    var endpoint = service + config.items + '/' + itemId + config.type;

    request
        .del(endpoint)
        .proxy(config.proxy)
        .auth(account, password)
        .end(function (err, res) {
            callback(err, res);
        });
};

function update(itemId, itemJson, callback) {
    var endpoint = service + config.items + '/' + itemId + config.type;

    request
        .put(endpoint)
        .proxy(config.proxy)
        .auth(account, password)
        .send(itemJson)
        .end(function (err, res) {
            callback(err, res);
        });
};

function getById(itemId, callback) {
    var endpoint = service + config.items + '/' + itemId + config.type;

    request
        .get(endpoint)
        .proxy(config.proxy)
        .auth(account, password)
        .end(function (err, res) {
            callback(err, res);
        });
}

function getAll(callback) {
    var endpoint = service + config.items + config.type;

    request
        .get(endpoint)
        .proxy(config.proxy)
        .auth(account, password)
        .end(function (err, res) {
            callback(err, res);
        });
}

function emptyRecycleBin(callback) {
    var endpoint = service + config.filters + '/-4' + config.items + config.type;
    request
        .del('http://todo.ly/api/filters/-4/items.json')
        .proxy(config.proxy)
        .auth(account, password)
        .end(function (err, res) {
            callback(err, res);
        });
}


exports.create = create;
exports.del = del;
exports.update = update;
exports.getById = getById;
exports.getAll = getAll;