var fs = require('fs')
  , path = require('path')
  , http = require('http')
  , socketio = require('socket.io')
  , sockets = []
  ;

var index = fs.readFileSync(path.join(__dirname, '10.html'))

var server = http.createServer(function (req, resp) {
  if (req.url === '/') {
    resp.statusCode = 200
    resp.setHeader('content-type', 'text/html')
    resp.end(index)
  }
})

var io = socketio.listen(server)
server.listen(1337)

io.sockets.on('connection', function (socket) {
  sockets.push(socket)
})

process.stdin.resume()
process.stdin.on('data', function (chunk) {
  sockets.forEach(function (socket) {
    socket.emit('data', chunk.toString())
  })
})