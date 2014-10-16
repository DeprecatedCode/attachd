/**
 * Attachd API
 * (c) All Rights Reserved - Nate Ferrero
 *
 * @author Nate Ferrero
 */
var amna = require('amna');

/**
 * User Schema
 */
var User = module.exports = amna.thing({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    picture: String,
    gender: String,
    google: amna.types.Mixed
});

/**
 * Default user JSON data available to all users
 */
User.schema.set('toJSON', {
    transform: function(doc, ret, options) {
        return {
            _id: ret._id,
            name: ret.name,
            gender: ret.gender,
            picture: ret.picture
        };
    }
});

/**
 * Text Search
 */
User.textSearch('name', 'email');

/**
 * Autocomplete
 */
User.autocompleteFields('name', 'email');

/**
 * Transform Google Profile Data
 */
User.schema.statics.transformGoogleData = function (profile, tokens) {
    var data = {
        google: {
            id: profile.id,
            tokens: tokens
        }
    };

    /**
     * Copy fields to user profile fields
     */
    ['email', 'name', 'picture', 'gender'].forEach(function (key) {
        if (typeof profile[key] !== 'undefined') {
            data[key] = profile[key];
        }
    });
    return data;
};

/**
 * Find or create a user from Google Profile Data
 */
User.schema.statics.findOrCreateFromGoogle = function (profile, tokens, done) {
    /**
     * Clean up profile data to match our user format
     */
    var data = User.model.transformGoogleData(profile, tokens);

    /**
     * Automatically save changes from Google on every login
     */
    var updateUser = function (err, user) {
        if (err) { return done(err); }
        user.update(data, function (err) {
            if (err) { return done(err); }
            done(null, user);
        });
    };

    /**
     * Associate with email account if found
     */
    if (data.email && data.email.length) {
        User.model.findOrCreate({"email": data.email.toLowerCase()},
            data, updateUser);
    }

    /**
     * Otherwise, look up the user by google.id
     */
    else {
        User.model.findOrCreate({"google.id": data.google.id},
            data, updateUser);
    }
};
