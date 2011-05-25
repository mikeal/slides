var http = require('http')
  , path = require('path')
  , fs = require('fs')
  , request = require('request')
  ;

s = http.createServer();
s.on('request', function (req, resp) {
  var p = path.join(__dirname, req.url);
  if (req.method == 'PUT') {
    setTimeout(function () {
      var s = fs.createWriteStream(p);
      req.pipe(s);
      s.on('end', function () {
        console.log('write end');
        resp.writeHead(201); resp.end();
      })
    }, 1 * 1000)
    req.on('end', function () { console.log('request end'); })
  }
})
s.listen(8888)

var notes = fs.createReadStream(path.join(__dirname, 'notes.txt'));
notes.pipe(request.put('http://localhost:8888/newfile-2.txt'));

notes.on('end', function () {
  console.log('read end')
})