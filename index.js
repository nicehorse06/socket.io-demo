var app = require('express')();
var http = require('http').Server(app);
// 此io帶入http server當作參數
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// 監聽connection事件，觸發函式
io.on('connection', function(socket){
	console.log('a user connected');

	// 監聽disconnect事件，如果頁面關閉或刷新就會觸發函式
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	// 監聽chat message事件，觸發函式
	socket.on('chat message', function(msg){
		// 發出chat message事件到所有瀏覽器端使用者
		io.emit('chat message', msg);
		console.log('message: ' + msg);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});