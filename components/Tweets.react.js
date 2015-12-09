var React = require('react');
var Tweet = require('./Tweet.react');

module.exports = Tweets = React.createClass({
  // Render the component
  render: function(){

    return (
      <div className="tweets">
          tweets
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
      </div>
    )
  }
});
