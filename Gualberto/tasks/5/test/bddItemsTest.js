var expect = require('chai').expect;
var item = require('../lib/item.js');

describe('Given an Item in the Inbox filter',function () {
    var expectedStatus = 200;
    this.timeout(10000);

    var itemCreated;
    var itemId;


    before(function (done) {
        /*Create the item in the Inbox filter*/

        item
            .createItem(function (err,res) {
                itemCreated = res.body;
                itemId = itemCreated.Id;

                /*Assertions*/
                expect(res.status).to.equal(expectedStatus);
                /*Assertions*/
                done();
            });
    });

    after(function () {
        /*delete the item*/
        item
            .deleteItem(itemId,function (err,res) {

                /*Assertions*/
                expect(res.status).to.equal(expectedStatus);
                /*Assertions*/
                done();
            });

    });

    it('And it is marked as done',function (done) {
        /*code to create the item already done*/

        var checkedItem = { Checked: true };

        item
            .updateItem(itemId,checkedItem,function (err,res) {

                /*Assertions*/
                expect(res.status).to.equal(expectedStatus);
                /*Assertions*/
                done();
            });
    });

    it('And it is deleted',function (done) {
        /*code to delete the item*/

        item
            .deleteItem(itemId,function (err,res) {

                /*Assertions*/
                expect(res.status).to.equal(expectedStatus);
                /*Assertions*/
                done();
            });
    });

    describe('When the item is restored from the Recycle Bin to inbox',function () {
        before(function (done) {
            /*Code to restore from Recycle Bin*/

            var restoreItem = { Deleted: false };

            item
                .updateItem(itemId,restoreItem,function (err,res) {
                    /*Assertions*/
                    expect(res.status).to.equal(expectedStatus);
                    /*Assertions*/
                    done();
                });
        });

    });

    describe('When the item is unmarked as done',function () {
        before(function (done) {
            /*Code to unmark as done*/

            var checkedItem = { Checked: false };

            item
                .updateItem(itemId,checkedItem,function (err,res) {

                    /*Assertions*/
                    expect(res.status).to.equal(expectedStatus);
                    /*Assertions*/
                    done();
                });
        });

        it('The item is no longer part of the done list',function (done) {
            /*Get the Inbox list, verify the item is not present in the list*/

            item
                .getDoneItems(function (err,res) {

                    /*Assertions*/
                    expect(res.status).to.equal(expectedStatus);
                    expect(res.body).to.be.empty;
                    /*Assertions*/
                    done();
                });

        });

        it('And the item is in active state',function () {
            /*Assertions*/
            expect(itemCreated.Checked).to.equal(false);
            /*Assertions*/
        });
    });
});