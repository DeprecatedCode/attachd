/**
 * Attachd API
 * (c) All Rights Reserved - Nate Ferrero
 *
 * @author Nate Ferrero
 */
var amna = require('amna');

var ThreadsAPI = module.exports = amna.collection(amna.things.Thread, {
    readOnly: true
});
