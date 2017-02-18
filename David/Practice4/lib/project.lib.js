var request = require('superagent');
require('superagent-proxy')(request);

var conf = require('../tsconfig.json');
var logger = require('../logger/logger').getLogger('project');
var tokenFile = require('../resources/token.json');

var token = {
    "Token": tokenFile.TokenString
};
var urlProject = conf.url + 'projects';
var proxy = conf.proxy;
var user = conf.user;
var pass = conf.password;
var ext = conf.type;
var dom = urlProject + conf.slash;

function post(projectJson, callback) {
    request
        .post(urlProject + ext)
        .proxy(proxy)
        // .auth(user, pass)
        .set(token)
        .send(projectJson)
        .end(function (err, res) {
            logger.debug('POST /projects.json');
            if (err != null) {
                logger.error(err.status);
                logger.error(err.response);
            }
            ;
            logger.debug(res.body);
            // console.log(res.body);
            callback(err, res);
        });
};

function del(projectId, callback) {
    request.del(dom + projectId + ext)
        .proxy(proxy)
        // .auth(user, pass)
        .set(token)
        .end(function (err, res) {
            logger.debug('DELETE /projects.json');
            if (err != null) {
                logger.error(err.status);
                logger.error(err.response);
            }
            ;
            logger.debug(res.body);
            // console.log(res.body);
            callback(err, res);
        });
};

function put(projectId, projectJson, callback) {
    request.post(dom + projectId + ext)
        .proxy(proxy)
        // .auth(user, pass)
        .set(token)
        .send(projectJson)
        .end(function (err, res) {
            logger.debug('PUT /projects.json');
            if (err != null) {
                logger.error(err.status);
                logger.error(err.response);
            }
            ;
            logger.debug(res.body);
            // console.log(res.body);
            callback(err, res);
        });
};

exports.post = post;
exports.del = del;
exports.put = put;