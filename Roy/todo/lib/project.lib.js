var request = require('superagent');
require('superagent-proxy')(request);
var generalConfig = require('../config/credentials.json');
var endpoints = require('../resources/endpoints.json');

var tokenGenerator = require('./helpers/TokenGenerator');

var url = generalConfig.url;
var endpoint = endpoints.projects;

var header = {Token: tokenBody.TokenString};

function create(projectJson, callback) {
   request
        .post(url + endpoint + '.json')
        .proxy(generalConfig.proxy)
        .set(header)
        .send(projectJson)
        .end(function (err, res) {
            console.log(res.body);
            callback(err, res);
        });
}

function del(projectId, callback) {
    request.del(url + endpoint + '/' + projectId + '.json')
        .proxy(generalConfig.proxy)
        .set(header)
        .end(function (err, res) {
            callback(err, res);
        });
}

function update(projectId, projectJson, callback) {
    request.put(url + endpoint + '/' + projectId + '.json')
        .proxy(generalConfig.proxy)
        .set(header)
        .send(projectJson)
        .end(function (err, res) {
            callback(err, res)
        })
}

exports.create = create;
exports.del = del;
exports.update = update;