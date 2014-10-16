/**
 * Attachd API
 * (c) All Rights Reserved - Nate Ferrero
 *
 * @author Nate Ferrero
 */
var amna = require('amna');

/**
 * Thread Schema
 */
var Thread = module.exports = amna.thing({
    _id: {
        type: String,
        unique: true
    },
    subject: String,
    users: [amna.refs.User]
});

/**
 * Text Search
 */
Thread.textSearch('subject');

/**
 * Autocomplete
 */
Thread.autocompleteFields('subject');
