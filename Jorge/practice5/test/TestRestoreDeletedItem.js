/**
 * Created by Administrator on 2/18/2017.
 * Story: Restore Deleted Items
 Scenario: Restore Deleted Item from Recycle Bin to Inbox
 As employe
 I want to restore deleted items
 so, that I can continue working on them

 Given an item in the inbox filter
 And it is a marked as done
 And it is deleted
 When the item is present in the inbox
 Then the item is present in the inbox list as done
 When the item is unmarked as done
 Then the item is no longer part of done list
 And the item on active state
 */
var expect = require('chai').expect;
var item = require('../lib/item.lib');
var filters = require('../lib/filters.lib');
var tokenLib = require('../lib/Token.lib');

describe('Given an item in the inbox filter', function () {
    this.timeout(9000);
    var itemUpdated = {};

    var itemJson = {
        Content: 'ItemAT02'
    };

    before(function (done) {
        tokenLib
            .getToken(function (err, res) {
                item
                    .create(itemJson, function (err, res) {
                        itemJson.Id = res.body.Id;
                        done();
                    })
            })

    });

    after(function (done) {
        item
            .del(itemJson.Id, function (err, res) {
                filters
                    .emptyRecycleBin(function (err, res) {
                        done();
                    });
            });
    });

    it('And it is a marked as done', function (done) {
        var itemUpdateJson = {
            Checked: 'true'
        };
        item
            .update(itemJson.Id, itemUpdateJson, function (err, res) {
                done();
            })
    });
    it(' And it is deleted', function (done) {

        item
            .del(itemJson.Id, function (err, res) {
                done();
            })
    });

    describe('When the item is restored from Recycle Bin to Inbox', function () {
        before(function (done) {
            var itemUpdateJson = {
                Deleted: 'false'
            };
            item
                .update(itemJson.Id, itemUpdateJson, function (err, res) {
                    done();
                })
        })

        it('Then the item is present in the inbox list as done', function (done) {
            filters
                .getDoneFilters(function (error, res) {
                    var list = res.body;
                    var expected = false;
                    list.forEach(function (item) {
                        if (item.Id == itemJson.Id) {
                            expected = true;
                        }
                    })
                    expect(expected).to.be.true;
                    done();
                })
        });

    });

    describe('When the item is unmarked as done', function () {
        before(function (done) {
            var itemUpdateJson = {
                Checked: 'false'
            };
            item
                .update(itemJson.Id, itemUpdateJson, function (err, res) {
                    itemUpdated = res.body;
                    done();
                })
        });

        it('Then the item is no longer part of done list', function (done) {
            filters
                .getDoneFilters(function (error, res) {
                    var list = res.body;
                    var expected = false;
                    list.forEach(function (item) {
                        if (item.Id == itemJson.Id) {
                            expected = true;
                        }
                    })
                    expect(expected).to.be.false;
                    done();
                })
        });

        it('And the item is in active state', function (done) {
            filters
                .getItems(function (error, res) {
                    var list = res.body;
                    var itemRes = {};
                    list.forEach(function (item) {
                        if (item.Id == itemJson.Id) {
                            itemRes = item;
                        }
                    })
                    expect(itemRes.Checked).to.be.false;
                    done();
                })
        });
    });

});