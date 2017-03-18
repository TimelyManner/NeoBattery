/**
 * 
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ip = require('ip');

//app.get('/', function(req, res){
//  res.send('<h1>Hello world</h1>');
//});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
	});

var cnt = 0;	// the nubmer of clients

io.on('connection', function(socket){
	cnt++;
	var msg = 'A user has connected here, so ' +  'the total number of chatters is ' + cnt + '.';
	console.log(msg);
	io.emit('chat message', msg);
	
	socket.on('disconnect', function(){
		cnt--;
		var msg = 'A user has disconnected here, so ' + 'the total number of chatters is ' + cnt + '.';
	    console.log('user disconnected');
	    io.emit('chat message', 'One more chatter has logged out!');
	    });
	
	socket.on('chat message', function(msg){
		var line = '[' + msg.nick_name + ']: ' + msg.text;
		console.log(line);
	    io.emit('chat message', line);
	  });
	});

var server = http.listen(port=3000, function(){
	console.log('listening on http://' + ip.address() + ':' + port);
});

