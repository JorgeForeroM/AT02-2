var log4js = require('log4js');
var config = require('../config.json');

log4js.configure(config.logger);

module.exports = log4js;