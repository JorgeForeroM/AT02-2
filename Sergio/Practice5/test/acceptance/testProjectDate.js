var expect = require('chai').expect;
var request = require('superagent');
require('superagent-proxy')(request);
var proj = require('../../src/projects.js');
var conf = require('../../configuration.json');
var moment=require('moment');

describe('todo.ly projects', function () {
    var jsonProject = {Content: "testDate"};
    var bodyProject;
    it('create project', function (done) {
        request
            .post(proj.createNewProject)
            .proxy(conf.proxy)
            .auth(conf.user, conf.pass)
            .send(jsonProject)
            .end(function (err, res) {
                bodyProject = res.body;
                expect(moment(bodyProject.LastSyncedDateTime).format("l")).to.equal(moment().format('l'));
                done();
            })

    })
})