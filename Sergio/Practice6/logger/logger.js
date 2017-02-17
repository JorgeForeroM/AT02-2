var conf = require('../config/config.json');
var log4js = require('log4js');

log4js.configure(conf.logger);

module.exports = log4js;
