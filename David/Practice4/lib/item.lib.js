/**
 * Created by David on 2/16/2017.
 */

var request = require('superagent');
require('superagent-proxy')(request);
var conf = require('../tsconfig.json');
var logger = require('../logger/logger').getLogger('project');
var tokenFile = require('../resources/token.json');

var token = tokenFile.TokenString;
var urlItem = conf.url + 'items';
var proxy = conf.proxy;
var user = conf.user;
var pass = conf.password;
var ext = conf.type;
var dom = urlItem + conf.slash;


function post(itemJson, callback) {
    request.post(urlItem + ext)
        .proxy(proxy)
        .auth(user, pass)
        // .set(token)
        .send(itemJson)
        .end(function (err, res) {
            callback(err, res);
        });
};

function del(callback) {
    request.del('https://todo.ly/api/filters/-4/items.json')
        .proxy(proxy)
        .auth(user, pass)
        // .set(token)
        .end(function (err, res) {
            callback(err, res);
        });
};

function itemDel(itemId, callback) {
    request
        .del(dom + itemId + ext)
        .proxy(proxy)
        .auth(user, pass)
        .end(function (err, res) {
            callback(err, res);
        });
};

function put(itemId, itemJson, callback) {
    request.post(dom + itemId + ext)
        .proxy(proxy)
        .auth(user, pass)
        .send(itemJson)
        .end(function (err, res) {
            logger.debug('PUT /items.json');
            if (err != null) {
                logger.error(err.status);
                logger.error(err.response);
            };
            logger.debug(res.body);
            // console.log(res.body);
            callback(err, res);
        });
};

function getItemsDone(itemId, callback) {
    request
        .get('https://todo.ly/api/filters/0/doneitems.json')
        .proxy(proxy)
        .auth(user, pass)
        .end(function (err, res) {
            console.log(verifyItem(res.body, itemId));
            callback(err, res);
        });
}
function verifyItem(item, itemId) {
    for (var index = 0; index < item.length; index++) {
        if (item[index].Id === itemId) return true;
        else return false;
    };
}

exports.post = post;
exports.del = del;
exports.put = put;
exports.itemDel = itemDel;
exports.verifyItem = verifyItem;
exports.getItemsDone = getItemsDone;