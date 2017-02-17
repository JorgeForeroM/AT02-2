var expect = require('chai').expect;
var request = require('superagent');
require('superagent-proxy')(request);
var project = require('../../lib/projectLib.js');


describe('Item functional Test', function () {
    this.timeout(4000);
    it('create a project POST /project.json', function (done) {
        project.create({"Content": "bla1", "Icon": 4}, function (err, res) {
            expect(res.status).to.equal(200);
            project.deleteById(res.body.Id, function (err, res) {
                done();
            });
        });
    });

    it('modify a project PUT /project.json', function (done) {
        project.create({"Content": "bla1", "Icon": 4}, function (err, res) {
            project.modify(res.body.Id,{Content:"modify"},function (err, res) {
                expect(res.status).to.equal(200);
                project.deleteById(res.body.Id,function (err, res) {
                    done();
                })
            });
        });
    });
});