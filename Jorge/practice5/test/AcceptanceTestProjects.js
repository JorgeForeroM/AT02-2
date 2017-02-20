/**
 * Created by Administrator on 2/16/2017.
 */
var expect = require('chai').expect;
var project = require('../lib/project.lib');
var tokenLib = require('../lib/Token.lib');

describe('Acceptance Test for Projects', function () {
    var expectedStatus = 200;
    this.timeout(9000);

    var projectJson = {
        Content: 'ProjectAT02',
        Icon: 8
    };

    afterEach(function (done) {
        if (projectJson.Id) {
            project
                .del(projectJson.Id, function (err, res) {
                    done();
                })
        } else {
            done();
        }
    });

    context('POST test', function (done) {
        it('POST / projects/json returns 200', function (done) {
            tokenLib
                .getToken(function (err, res) {
                    project
                        .create(projectJson, function (err, res) {
                            projectJson.Id = res.body.Id;
                            var projectCreated = res.body;
                            expect(res.status).to.equal(expectedStatus);
                            expect(projectJson.Id).to.equal(projectCreated.Id);
                            done();
                        });
                })

        });

    });

    context('PUT / DELETE and GET test', function () {
        beforeEach(function (done) {
            tokenLib
                .getToken(function (err, res) {
                    project
                        .create(projectJson, function (err, res) {
                            projectJson.Id = res.body.Id;
                            done();
                        });
                });

        });

        it('GET / projects/[id].json returns 200', function (done) {
            project
                .get(projectJson.Id, function (err, res) {
                    var projectGet = res.body;
                    expect(res.status).to.equal(expectedStatus);
                    expect(projectJson.Id).to.equal(projectGet.Id);
                    done();
                })
        });

        it('PUT / projects/[id].json returns 200', function (done) {
            var projectToUpdateJson = {
                Content: 'PUT project',
                Icon: 4
            }

            project
                .update(projectJson.Id, projectToUpdateJson, function (err, res) {
                    var projectUpdated = res.body;
                    /*Assertions*/
                    expect(res.status).to.equal(expectedStatus);
                    expect(projectUpdated.Icon).to.equal(projectToUpdateJson.Icon);
                    /*Assertions*/
                    done();
                });
        });

        it('DELETE / projects/[id].json returns 200', function (done) {
            project
                .del(projectJson.Id, function (err, res) {
                    var projectDeleted = res.body;
                    /*Assertions*/
                    expect(res.status).to.equal(expectedStatus);
                    expect(projectJson.Id).to.equal(projectDeleted.Id);
                    expect(projectDeleted.Deleted).to.be.true;
                    projectJson.Id = undefined;
                    /*Assertions*/
                    done();
                })
        })

    });

});

