var React = require('react');
var Loader = require('./Loader.react');
var Tweets = require('./Tweets.react');
var NotificationBar = require('./NotificationBar.react');

module.exports = TweetsApp = React.createClass({
  // Render the component
  render: function(){

    return (
      <div className="tweets-app">
          <h1>tweets app</h1>
          <Tweets />
          <Loader />
          <NotificationBar />
      </div>
    )
  }
});
