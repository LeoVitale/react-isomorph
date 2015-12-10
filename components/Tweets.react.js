var React = require('react');
var Tweet = require('./Tweet.react');

module.exports = Tweets = React.createClass({
    // Render the component
    render: function() {


        // Build list items of single tweet components using map
        var content = this.props.tweets.map(function(tweet) {
            var random = Math.random(7777);
            return (
                <Tweet key={tweet.twid} tweet={tweet}/>
            )
        });

        // Return ul filled with our mapped tweets
        return (
            <ul className="tweets">{content}</ul>
        )
    }
});
