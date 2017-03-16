/**
 * http://usejsdoc.org/
 */
var http      = require('http');
var socketio  = require('socket.io');
var server    = http.createServer();
var io        = socketio.listen(server);
var clients   = [];
 
// 서버 listen
server.listen(process.env.PORT || 8798, process.env.IP || "143.248.200.195", function(){
  var addr = server.address();
  console.log("server listening", addr.address + ":" + addr.port);
});
 
var test = io.on('connection', function (client) {
  console.log('접속완료');
  
  // 접속한 클라이언트를 배열에 담기
  clients.push(client);
  
  // 접속한 클라이언트가 접속 끊었을 경우 다른 접속자 에게 알림
  client.on('disconnect', function () {
    clients.forEach(function(value, index, ar) {
      clients[index].emit("closeClient", { message : client.id + "님이 나가셨습니다." });
    });
  });
  
  // 서버에서 클라이언트로 데이터 보낼 때
  clients.forEach(function(value, index, ar) {
      clients[index].emit("openClient", { message : client.id + "님 채팅방에 오신것을 환영합니다. ", uid : client.id });
  });
  
  // 클라이언트로 부터 데이터 받았을 때
  client.on("receiveClient", function (data) {
    clients.forEach(function(value, index, ar) {
      clients[index].emit("sendClient", { message : data.clientValue, uid : data.clientId });
    });
  });
  
});