/**
 * Attachd API
 * (c) All Rights Reserved - Nate Ferrero
 *
 * @author Nate Ferrero
 */
var amna = require('amna');

/**
 * Attachment Schema
 */
var Attachment = module.exports = amna.thing({
    _id: {
        type: String,
        unique: true
    },
    name: String,
    messageId: String,
    thread: amna.refs.Thread,
    from: amna.refs.User
});

/**
 * Text Search
 */
Attachment.textSearch('name');

/**
 * Autocomplete
 */
Attachment.autocompleteFields('name');
