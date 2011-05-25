var http = require('http')
  , path = require('path')
  , fs = require('fs')
  , request = require('request')
  ;

http.createServer(function (req, resp) {
  var p = path.join(__dirname, req.url);
  if (req.method === 'GET') {
    resp.writeHead(200);
    fs.createReadStream(p).pipe(resp);
  } else if (req.method == 'PUT') {
    var s = fs.createWriteStream(p);
    req.pipe(s);
    s.on('end', function () {
      resp.writeHead(201);
      resp.end();
    })
  }
}).listen(8888)

request('http://localhost:8888/hello.txt', function (e, resp, body) {
  console.log(body);
})

var notes = fs.createReadStream(path.join(__dirname, 'notes.txt'))
notes.pipe(request.put('http://localhost:8888/newfile.txt'))
