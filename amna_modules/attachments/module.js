/**
 * Attachd API
 * (c) All Rights Reserved - Nate Ferrero
 *
 * @author Nate Ferrero
 */
var amna = require('amna');

var AttachmentsAPI = module.exports = amna.collection(amna.things.Attachment, {
    readOnly: true
});
