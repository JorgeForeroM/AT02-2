var expect = require('chai').expect;
var request = require('superagent');
require('superagent-proxy')(request); //extending the functionality of request

describe('Acceptance test for ITEMS', function () {
    var expectedStatus = 200;
    this.timeout(10000);

    it('mark DONE as UNDONE /items.json of an item for a project', function (done) {

        var projectJson = {
            Content: 'newProjectWednesday',
            Icon: 2
        }
        var updateItem= {
            Checked: 'false'
        }

        //Create a new project
        request
            .post('https://todo.ly/api/projects.json')
            .proxy('http://172.31.90.146:3128')
            .auth('fernando.iquiza@fundacion-jala.org', 'MTat676435019')
            .send(projectJson)
            .end(function (err, res) {
                var projectBody = res.body;
                expect(200).to.equal(res.status);
                var createItem = {
                    Content: 'itemToBeModified',
                    ProjectId: projectBody.Id,
                    Checked: 'true'
                }

                //Creates a new Item checked as Done inside the project created
                request
                    .post('https://todo.ly/api/items.json')
                    .proxy('http://172.31.90.146:3128')
                    .auth('fernando.iquiza@fundacion-jala.org', 'MTat676435019')
                    .send(createItem)
                    .end(function (err, res) {
                        var itemBody = res.body;

                        //Modifies the item Done as Undone
                        request
                            .put('https://todo.ly/api/items/' + itemBody.Id + '.json')
                            .proxy('http://172.31.90.146:3128')
                            .auth('fernando.iquiza@fundacion-jala.org', 'MTat676435019')
                            .send(updateItem)
                            .end(function (err, res) {
                                var itemModifiedBody = res.body;
                                expect(itemModifiedBody.Checked).to.equal(false);

                                //Delete the Project created before
                                request
                                    .del('https://todo.ly/api/projects/' + projectBody.Id + '.json')
                                    .proxy('http://172.31.90.146:3128')
                                    .auth('fernando.iquiza@fundacion-jala.org', 'MTat676435019')
                                    .end(function (err, res) {

                                        //Delete Item from the Recycler
                                        request
                                            .del('https://todo.ly/api/filters/-4/items.json')
                                            .proxy('http://172.31.90.146:3128')
                                            .auth('fernando.iquiza@fundacion-jala.org', 'MTat676435019')
                                            .end(function (err, res) {
                                                done();
                                            })
                                    })
                    })
            })
    });
});
});

