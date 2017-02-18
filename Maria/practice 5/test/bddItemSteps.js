var expect = require('chai').expect;
var request = require('superagent');
var moment = require('moment');
require('superagent-proxy')(request);

describe(' Given an item in the Inbox filter', function (){
    var item;
    expectedStatus =200;
    this.timeout(5000);
    before(function(done){

        itemCreate = {
            Content: 'Item Test'
        };

        request
            .post('https://todo.ly/api/items.json')
            .proxy('http://172.31.90.146:3128')
            .auth('angelica.rodriguez@fundacion-jala.org','At2406240688')
            .send(itemCreate)
            .end(function(err,res){
                item = res.body;
                itemCreate.Id = res.body.Id;
                expect(res.status).to.equal(expectedStatus);
                expect(item.Content).to.equal(itemCreate.Content);
                done();
            });

    });
    after(function () {

    });

    it('And it is marked as done', function (done) {

        itemPut = {
            Checked: 'true'
        };

        request
            .put('https://todo.ly/api/items/'+item.Id+'.json')
            .proxy('http://172.31.90.146:3128')
            .auth('angelica.rodriguez@fundacion-jala.org','At2406240688')
            .send(itemPut)
            .end(function(err,res){
                var itemPut = res.body;
                expect(itemPut.Checked).to.be.true;
                done();
            });

    });
     it('And it is deleted', function (done) {

          var  expectedStatus = 200;
          request
          .del('https://todo.ly/api/items/'+item.Id+'.json')

          .proxy('http://172.31.90.146:3128')
          .auth('angelica.rodriguez@fundacion-jala.org','At2406240688')
          .end(function(err,res){
          itemDelete = res.body;
          resStatus =res.status;
          expect(resStatus).to.equal(expectedStatus);
          expect(itemDelete.Deleted).to.be.true;
          done();
          });
     });


    describe('When the item is restored from Recycle Bin to Inbox', function () {
        before(function (done) {
            itemPut = {
                Deleted: 'false'
            };

            request
                .put('https://todo.ly/api/items/'+item.Id+'.json')
                .proxy('http://172.31.90.146:3128')
                .auth('angelica.rodriguez@fundacion-jala.org','At2406240688')
                .send(itemPut)
                .end(function(err,res){
                    var itemPut = res.body;
                    expect(itemPut.Deleted).to.be.false;
                    done();
                });

        });

        it('Then the item is present in the Inbox list as done',function (done) {
            request
                .get('https://todo.ly/api/filters/0/doneitems.json')
                .proxy('http://172.31.90.146:3128')
                .auth('angelica.rodriguez@fundacion-jala.org','At2406240688')
                .end(function(err,res){
                    var itemGet = res.body;
                    expect(res.status).to.equal(expectedStatus);
                    expect(itemGet[0].Id).to.equal(itemCreate.Id);
                    expect(itemGet[0].Content).to.equal(itemCreate.Content);
                    done();
                });

        });

    });

    describe('When the item is unmarked as done', function () {

        before(function (done) {
            itemPut = {
                Checked: 'false'
            };

            request
                .put('https://todo.ly/api/items/'+item.Id+'.json')
                .proxy('http://172.31.90.146:3128')
                .auth('angelica.rodriguez@fundacion-jala.org','At2406240688')
                .send(itemPut)
                .end(function(err,res){
                    var itemPut = res.body;
                    expect(itemPut.Checked).to.be.false;
                    done();
                });
        });
        it('Then the item is no longer part of done list', function () {
            request
                .get('https://todo.ly/api/filters/0/doneitems.json')
                .proxy('http://172.31.90.146:3128')
                .auth('angelica.rodriguez@fundacion-jala.org','At2406240688')
                .end(function(err,res){
                    var itemGet = res.body;
                    expect(res.status).to.equal(expectedStatus);
                    expect(itemGet).to.be.empty;
                    done();
                });


        });
        it('And the item is in active state', function () {
              expect(item.Checked).to.be.false;
        });
    });
 });







