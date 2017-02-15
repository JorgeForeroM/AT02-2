var expect = require('chai').expect;
var request = require('superagent');
require('superagent-proxy')(request); //extending the functionality of request
var moment = require('moment');

describe('ACCEPTANCE Test for Projects', function () {
    var expectedStatus = 200;
    this.timeout(10000);
    var projectCreated;
    var projectJson;
    var parameterDEL;


    beforeEach(function (done) {
        projectJson = {
            Content: 'Fher POST',
            Icon: 10
        }

        request
            .post('https://todo.ly/api/projects.json')
            .proxy('http://172.31.90.146:3128')
            .auth('fernando.iquiza@fundacion-jala.org', 'MTat676435019')
            .send(projectJson)
            .end(function (err, res) {
                projectCreated = res.body;
                done();
            });
    })

    afterEach(function (done) {
        request
            .del('https://todo.ly/api/projects/' + projectCreated.Id + '.json')
            .proxy('http://172.31.90.146:3128')
            .auth('fernando.iquiza@fundacion-jala.org', 'MTat676435019')
            .end(function (err, res) {
                parameterDEL = res.body;
                done();
            })
    })


    it('POST /projects.json creates a project', function () {

        expect(projectCreated.Content).to.equal(projectJson.Content);
        expect(projectCreated.Icon).to.equal(projectJson.Icon);

        /* More Assertions */
        expect(projectCreated.Id).to.not.be.null;
        expect(projectCreated.ParentId).to.be.null;
        expect(projectCreated.ItemsCount).to.be.equal;
        expect(projectCreated.Children).to.be.empty;
        expect(projectCreated.Deleted).to.be.false;
        expect(moment().isSame(moment(projectCreated.LastSyncedDateTime), 'day')).to.be.true;
    });

    it('DELETE /projects.json delete the name a project', function (done) {
        expect(true).to.equal(parameterDEL.Deleted);
        expect(moment().isSame(moment(projectCreated.LastSyncedDateTime), 'day')).to.be.true;
        done();
    });


    it('PUT /projects/{id}.json Modify the name a project', function (done) {

        var projectModified = {
            Content: 'PUT Fher'
        }

        request
            .put('https://todo.ly/api/projects/' + projectCreated.Id + '.json')
            .proxy('http://172.31.90.146:3128')
            .auth('fernando.iquiza@fundacion-jala.org', 'MTat676435019')
            .send(projectModified)
            .end(function (err, res) {
                var parameterPUT = res.body;
                expect(parameterPUT.Content).to.equal(projectModified.Content);
                expect(moment().isSame(moment(projectCreated.LastSyncedDateTime), 'day')).to.be.true;
            done();
            })
    });

    it('GET /projects.json retrieves a project by its ID', function (done) {

                request
                    .get('https://todo.ly/api/projects/' + projectCreated.Id + '.json')
                    .proxy('http://172.31.90.146:3128')
                    .auth('fernando.iquiza@fundacion-jala.org', 'MTat676435019')
                    .end(function (err, res) {
                        var parameterGetById = res.body;
                        expect(parameterGetById.Content).to.equal(projectCreated.Content);
                        expect(moment().isSame(moment(projectCreated.LastSyncedDateTime), 'day')).to.be.true;
                        done();
                    })
    });

    it('GET /projects.json obtains the full list of projects', function(done){
        request
            .get('https://todo.ly/api/projects.json')
            .proxy('http://172.31.90.146:3128')
            .auth('fernando.iquiza@fundacion-jala.org', 'MTat676435019')
            .end(function(err, res){
                expect(moment().isSame(moment(projectCreated.LastSyncedDateTime), 'day')).to.be.true;
                done();
            });
    });

});
