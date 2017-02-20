/**
 * Created by Administrator on 2/16/2017.
 */
var request = require('superagent');
require('superagent-proxy')(request);
var config = require('../config.json');
var logger = require('../logger/logger').getLogger('project');
var header = require('./header');

var account = config.account;
var password = config.password;
var service = config.service;

function create(projectJson, callback) {
    var endpoint = service + config.projects + config.type;

    request
        .post(endpoint)
        .proxy(config.proxy)
        .set(header)
        .send(projectJson)
        .end(function (err, res) {

            logger.debug('POST /projects.json');
            if (err != null) {
                logger.error(err.status);
                logger.error(err.response);
            }

            callback(err, res);
        });
};

function del(projectId, callback) {
    var endpoint = service + config.projects + '/' + projectId + config.type;

    request
        .del(endpoint)
        .proxy(config.proxy)
        .set(header)
        .end(function (err, res) {
            callback(err, res);
        });
};

function update(projectId, projectJson, callback) {
    var endpoint = service + config.projects + '/' + projectId + config.type;

    request
        .put(endpoint)
        .proxy(config.proxy)
        .set(header)
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
        .set(header)
        .end(function (err, res) {
            callback(err, res);
        });
}

exports.create = create;
exports.del = del;
exports.update = update;
exports.get = get;