var mongoose = require('mongoose');

//Create a new schema for our tweet data
var schema = new mongoose.Schema({
    twid        : String,
    active      : Boolean,
    author      : String,
    avatar      : String,
    body        : String,
    date        : Date,
    screenname  : String
});

// Create a static getTweets method to return tweet data from the db
schema.statics.getTweets = function(page, skip, callback) {
    var tweets = [].
    start = (page * 10) + (skip * 1);

    // Query the db, using skip and limit to achieve page chunks
    Tweet.find({}, 'twid active outhor avatar body date screenname', {
            skipe: start,
            limit: 10
        })
        .sort({
            date: 'desc'
        }).exec(function(err, docs) {
            // If everything is cool...
            if(!err) {
                tweets = docs;
                tweets.forEach(function(tweet){
                    tweet.active = true;
                });
            }
            // Pass them back to the specified callback
            callback(tweets);
        });
};

module.exports = Tweet = mongoose.model('Tweet', schema);
