// Require our dependencies
var express = require('express'),
    exphbs = require('express-handlebars'),
    http = require('http'),
    mongoose = require('mongoose'),
    twitter = require('twitter'),
    routes = require('./routes'),
    config = require('./config'),
    streamHandler = require('./utils/streamHandler');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 3434;

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

// Connect to our mongo database
mongoose.connect('mongodb://localhost/react-tweets');

// Create a new ntwitter instance
 var twit = new twitter(config.twitter);

// Index Route
app.get('/', routes.index);

// Page Route
app.get('/page/:page/:skip', routes.page);

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// Fire this bitch up (start our server)
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// Initialize socket.io
var io = require('socket.io').listen(server);

// Set a stream listener for tweets matching tracking keywords
var params = {screen_name: 'nodejs'};
twit.stream('statuses/filter',{ track: 'react'}, function(stream){
    stream.on('data', function(tweet) {
       console.log(tweet.text);
     });

     stream.on('error', function(error) {
       throw error;
     });
     streamHandler(stream,io);
});

twit.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    //console.log(tweets);
  }
});
