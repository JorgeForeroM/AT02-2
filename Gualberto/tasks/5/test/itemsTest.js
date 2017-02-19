/*
 Story: Restore Deleted Items
 Scenario: Restore Deleted Items from Recycle to Inbox
 As employee
 I want to restore deleted items
 So, that I can continue working on them

 Given an item in the inbox filter
 And it is marked as done
 And it is deleted
 When the item is restored from the Recycle Bin to Inbox
 The item is present in the Inbox list as done
 When  the item is unmarked as done
 The the item is no longer part of the done list
 And the item on active state
 * */

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

    after(function (done) {
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
                expect(res.body.Checked).to.be.true;
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
                expect(res.body.Deleted).to.be.true;
                /*Assertions*/
                done();
            });
    });

    describe('When the item is restored from the Recycle Bin to inbox',function () {
        before(function (done) {
            /*Code to restore from RecycleBin*/

            var restoreItem = { Deleted: false };

            item
                .updateItem(itemId,restoreItem,function (err,res) {
                    itemCreated = res.body;
                    /*Assertions*/
                    expect(res.status).to.equal(expectedStatus);
                    expect(res.body.Deleted).to.be.false;
                    /*Assertions*/
                    done();
                });
        });

        it('Then the item is present in the Inbox list as done',function () {
            /*Assertions*/
            expect(itemCreated.Checked).to.be.true;
            /*Assertions*/
        });

    });

    describe('When the item is unmarked as done',function () {
        before(function (done) {
            /*Code to unmark as done*/

            var checkedItem = { Checked: false };

            item
                .updateItem(itemId,checkedItem,function (err,res) {
                    itemCreated = res.body;
                    /*Assertions*/
                    expect(res.status).to.equal(expectedStatus);
                    expect(res.body.Checked).to.be.false;
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