/**
 * Created by Administrator on 2/16/2017.
 */
var log4js = require('log4js')
var config = require('../config.json');

log4js.configure(config.logger);

module.exports = log4js;