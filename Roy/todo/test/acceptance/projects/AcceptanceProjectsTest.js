var expect = require('chai').expect;
var project = require('../../../lib/project.lib.js');
var tokenGenerator = require('../../../lib/helpers/TokenGenerator');

var request = require('superagent');
require('superagent-proxy')(request);
var moment = require('moment');


describe('Acceptance Projects', function () {
    var expectedStatus = 200;
    this.timeout(10000);

    var projectJson = {
        Content: 'Project Test',
        Icon: 4
    };


    before(function (done) {
        tokenGenerator.generateToken(function (err, tokenValue) {
            tokenBody.TokenString = tokenValue;
            done()
        })
    });


    afterEach(function (done) {
        if (projectJson.Id) {
            project.del(projectJson.Id, function (err, res) {
                done()
            })
        }
        else {
            done();
        }
    });

    context('PUT, DELETE AND GET TESTS', function () {
        beforeEach(function (done) {
            project.create(projectJson, function (err, res) {
                projectJson.Id = res.body.Id;
                done();
            });
        });

        it.only('Put /projects/[id].json returns 200', function (done) {
            var projectUpdate = {
                Icon: 8
            };

            project.update(projectJson.Id, projectUpdate, function (err, res) {
                expect(res.status).to.equal(expectedStatus);
                done();
            });
        });
    });
});