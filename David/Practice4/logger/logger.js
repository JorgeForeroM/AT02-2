var log4js = require('log4js');
var config = require('../logger/logger.json');

log4js.configure(config.logger);

module.exports = log4js;
