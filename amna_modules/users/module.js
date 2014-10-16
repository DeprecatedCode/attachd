/**
 * Attachd API
 * (c) All Rights Reserved - Nate Ferrero
 *
 * @author Nate Ferrero
 */
var amna = require('amna');

var UsersAPI = module.exports = amna.collection(amna.things.User, {
    readOnly: true
});
