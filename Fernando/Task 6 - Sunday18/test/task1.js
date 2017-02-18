var expect = require('chai').expect;
var request = require('superagent');
require('superagent-proxy')(request); //extending the functionality of request
var itemCreated;
var parameterDEL;
var projectBody;

describe('Restore item', function () {
    describe('Given an item in the inbox filter', function () {
        var expectedStatus = 200;
        this.timeout(10000);

        before(function (done) {
            /*create the item in the inbox filter*/
            //Get the filters
            request
                .get('https://todo.ly/api/filters.json')
                .proxy('http://172.31.90.146:3128')
                .auth('fernando.iquiza@fundacion-jala.org', 'MTat676435019')
                .end(function (err, res) {
                    projectBody = res.body;
                    console.log(projectBody)
                    expect(200).to.equal(res.status);
                    done();
                });

        });

        after(function () {
            /*delete the item*/
        });

        it('And it is marked as done', function (done) {
            /*code to create the item already done*/
            var createItem = {
                Content: 'itemTASK checked as Done13',
                ProjectId: '0',
                Checked: 'true'
            }
            request
                .post('https://todo.ly/api/items.json')
                .proxy('http://172.31.90.146:3128')
                .auth('fernando.iquiza@fundacion-jala.org', 'MTat676435019')
                .send(createItem)
                .end(function (err, res) {
                    itemCreated = res.body;
                    expect(200).to.equal(res.status);
                    console.log(itemCreated)
                    done();
                });
        });

        it('And it is deleted', function (done) {
            /*delete the item*/
            console.log(itemCreated)
            request
                .del('https://todo.ly/api/items/' + itemCreated.Id + '.json')
                .proxy('http://172.31.90.146:3128')
                .auth('fernando.iquiza@fundacion-jala.org', 'MTat676435019')
                .end(function (err, res) {
                    parameterDEL = res.body;
                    console.log(parameterDEL.Id + '***');
                    console.log(itemCreated.Id + '*********');
                    done();
                });
        });
    });

        describe('When the item is restored from Recycle bin to Inbox', function (done) {


            it ('test ID numbers', function () {
                console.log(parameterDEL.Id + '***');
                console.log(itemCreated.Id + '*********');
            })

            var recoverItem = {
                Deleted: 'false'
            }
            it ('something', function (done) {
                console.log(parameterDEL.Id);
                request
                    .put('https://todo.ly/api/items/' + parameterDEL.Id + '.json')
                    .proxy('http://172.31.90.146:3128')
                    .auth('fernando.iquiza@fundacion-jala.org', 'MTat676435019')
                    .send(recoverItem)
                    .end(function (err, res) {
                        undeletedItem = res.body;
                        console.log(undeletedItem)
                        // expect(undeletedItem.Deleted).to.equal(false);
                        done();
                        /*fixed test*/
                    });
            });


            it('Then the item is present in the Inbox list as done', function () {
                /**************** to be completed from here************/
            });
        });

        describe('When the item is unmarked as done', function () {
            before(function () {
                /*code to unnmark as done*/
            });
            it('Then the item is no longer part of donde list', function () {
                /*Get the inbox list, verify the item is not presented in the list*/
            });

            it('And the item is in active state', function () {
                /*Verify the done is active*/
            });
        });
    });


