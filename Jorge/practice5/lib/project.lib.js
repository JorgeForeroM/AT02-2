/**
 * Created by Administrator on 2/16/2017.
 */
var request = require('superagent');
require('superagent-proxy')(request);
var config = require('../config.json');


var account = config.account;
var password = config.password;
var service = config.service;

function create(projectJson, callback) {
    var endpoint = service + config.projects + config.type;

    request
        .post(endpoint)
        .proxy(config.proxy)
        .auth(account, password)
        .send(projectJson)
        .end(function (err, res) {
            callback(err, res);
        });
};

function del(projectId, callback) {
    var endpoint = service + config.projects + '/' + projectId + config.type;

    request
        .del(endpoint)
        .proxy(config.proxy)
        .auth(account, password)
        .end(function (err, res) {
            callback(err, res);
        });
};

function update(projectId, projectJson, callback) {
    var endpoint = service + config.projects + '/' + projectId + config.type;

    request
        .put(endpoint)
        .proxy(config.proxy)
        .auth(account, password)
        .send(projectJson)
        .end(function (err, res) {
            callback(err, res);
        });
};

function get(projectId, callback) {
    var endpoint = service + config.projects + '/' + projectId + config.type;

    request
        .get(endpoint)
        .proxy(config.proxy)
        .auth(account, password)
        .end(function (err, res) {
            callback(err, res);
        });
}

exports.create = create;
exports.del = del;
exports.update = update;
exports.get = get;