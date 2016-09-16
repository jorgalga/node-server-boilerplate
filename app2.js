var express = require('express');
var path = require('path');
var app = express();
var Twitter = require('twitter');

// Define the port to run on
app.set('port', 9000);
app.use(express.static(path.join(__dirname, '/public/')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('Server listens on port: ' + port);
});
var io = require('socket.io')(server);

// Twitter integration
var client = new Twitter({
  consumer_key: 'WSanvfG5Hzdt1SPQ2CJug',
  consumer_secret: 'dyFIkdJXSpmCM7lQGq9y2foojehWR49swwkPKm9J4o',
  access_token_key: '35708497-DhwN2m5dab6VvGqN5031BJHd6NopIb0M1mwMVv2Xs',
  access_token_secret: 'mB9GvqPgDsinZxZ9KW1tjkB93orQng9gf1IRokmIytJa6'
});


io.on('connection', function(socket) {

    console.log("connection");
    socket.on('slider-changed', function(data) {
        console.log("The slider changed. Value: "+data.value);
        socket.broadcast.emit("test","blabla");
    });

    socket.on('unreal-reply', function(data) {
        console.log("Unreal says "+data);

        client.post('statuses/update', {
            status: 'I just tweet this from a node.js app connected to Unreal Engine with SocketIO. A bit nerdy, to be honest xD'},
            function(error, tweet, response) {
                if(error) throw error;
                console.log(tweet);  // Tweet body.
                console.log(response);  // Raw response object.
            }
        );
    });
});
