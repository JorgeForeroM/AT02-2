/**
 * Created by David on 2/18/2017.
 */
var request = require('superagent');
require('superagent-proxy')(request);

var expect = require('chai').expect;
var project = require('../../lib/project.lib');
var item = require('../../lib/item.lib');

/*
 * Story: Restore Deleted Items
 * Scenario: Restore Deleted Item from Recycle Bin to Inbox
 *          As employee
 *          I want to restore deleted items
 *          So, that I can continue working on them
 *
 *      Give on item in the Inbox filter
 *          And it is marked as done
 *          And it is deleted
 *      When the item is restored from Recycle Bin to inbox
 *          Then the item is present in the Inbox list as done
 *      When the item is unmarked as done
 *          Then the item is no longer part of done list
 *          And the item on active state
 */

describe('Restore Deleted Items', function () {
    this.timeout(5000);
    var itemBase;

    describe('Restore Deleted Item from Recycle Bin to Inbox', function () {

        describe('Given an Item in the Inbox filter', function () {
            before(function (done) {
                itemBase = {
                    Content: 'Item Test BDT',
                    Checked: true
                };
                item
                    .post(itemBase, function (err, res) {
                        expect(res.status).to.equal(200);
                        itemBase = res.body;
                        done();
                    })
            });

            after(function (done) {
                item
                    .itemDel(itemBase.Id, function (err, res) {
                        item
                            .del(function (err, res) {
                                done();
                            });
                    });
            });

            it('And it is marked as done', function () {
                expect(itemBase.Checked).to.be.true;
            });

            it('And it is deleted', function (done) {
                item
                    .itemDel(itemBase.Id, function (err, res) {
                        expect(res.body.Deleted).to.be.true;
                        done();
                    });
            });

            describe('When the item is restored from Recycle Bin to Inbox', function () {
                before(function (done) {
                    var itemJson = {
                        Deleted: false
                    };
                    item
                        .put(itemBase.Id, itemJson, function (err, res) {
                            expect(res.body.Deleted).to.be.false;
                            done();
                        });

                });

                it('Then the item is present in the Inbox list as done', function () {
                    expect(itemBase.Checked).to.be.true;
                });
            });

            describe('When the items is unmarked as done', function () {
                before(function (done) {
                    var itemModify = {
                        Checked: false
                    };
                    item
                        .put(itemBase.Id, itemModify, function (err, res) {
                            expect(res.body.Checked).to.be.false;
                            itemBase = res.body;
                            done();
                        });
                });

                it('Then the item is no loger part of done list', function (done) {
                    item
                        .getItemsDone(itemBase.Id, function (err, res) {
                            expect(res.body).to.be.empty;
                            done();
                        });
                });

                it('And the item is in active state', function () {
                    expect(itemBase.Checked).to.be.false;
                });
            });
        });
    });
});