var request = require('superagent');
require('superagent-proxy')(request);
var conf = require('../config/config.json');
var logger = require('../logger/logger.js').getLogger('project');


function create(projectJson, callback) {
    request
        .post('https://todo.ly/api/projects.json')
        .proxy(conf.proxy)
        .auth(conf.account, conf.password)
        .send(projectJson)
        .end(function (err, res) {

            logger.debug('project - GET /projects.json');
            if (err != null) {
                logger.error(err.response);
            }
            logger.debug(res.body);

            callback(err, res);
        });
};

function modify(Id, projectJson, callback) {
    request
        .put('https://todo.ly/api/projects/' + Id + '.json')
        .proxy(conf.proxy)
        .auth(conf.account, conf.password)
        .send(projectJson)
        .end(function (err, res) {
            callback(err, res);
        });
}

function deleteById(projectId, callback) {
    request
        .del('https://todo.ly/api/projects/' + projectId + '.json')
        .proxy(conf.proxy)
        .auth(conf.account, conf.password)
        .end(function (err, res) {
            callback(err, res);
        });
};
exports.deleteById = deleteById;
exports.create = create;
exports.modify = modify;
