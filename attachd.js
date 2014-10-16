/**
 * Attachd API
 * (c) All Rights Reserved - Nate Ferrero
 *
 * @author Nate Ferrero
 */
var amna = module.exports = require('amna');

/**
 * Load amna things
 */
amna.registerThings([
    'Attachment',
    'Thread',
    'User'
]);

/**
 * Add GoogleAPIs service
 */
amna.registerServices(['GoogleAPIs']);

/**
 * What model to allow as createdBy
 */
amna.createdByThing = 'User';

/**
 * Set View Engine
 */
amna.set('view engine', 'ejs');

/**
 * Authentication
 */
amna.authentication = function () {
    return {

        /**
         * Allow login with Google and ask for access to Gmail API
         */
        google: amna.things.User.model.findOrCreateFromGoogle,

        /**
         * Save User on the session data
         */
        serializeUser: function (user, done) {
            done(null, user.id);
        },

        /**
         * Load User from the session data
         */
        deserializeUser: function (id, done) {
            amna.things.User.model.findById(id, done);
        }
    };
};

/**
 * Register amna modules under /api
 */
amna.registerModules('/api', [
    'attachments',
    'threads',
    'users'
]);

/**
 * Root controller
 */
var RootController = amna.controller();

/**
 * API Home Page
 */
RootController.get('/', function (self) {
    self.scope.user = self.req.user;
    self.render('index');
});

/**
 * Register amna modules on the root
 */
amna.registerModules([
    /**
     * Serve views
     */
    RootController,

    /**
     * Serve static content
     */
    amna.static(__dirname + '/public')
]);
