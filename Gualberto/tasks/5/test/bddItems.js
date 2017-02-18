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
