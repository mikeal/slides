var http = require('http')
  , path = require('path')
  , fs = require('fs')
  , morestreams = require('morestreams')
  , request = require('request')
  ;

s = http.createServer();
s.on('request', function (req, resp) {
  var p = path.join(__dirname, req.url);
  if (req.method == 'PUT') {
    
    var buf = new morestreams.BufferedStream();
    req.pipe(buf);
    
    setTimeout(function () {
      var s = fs.createWriteStream(p);
      buf.pipe(s);
      s.on('end', function () {
        console.log('write end');
        resp.writeHead(201); resp.end();
      })
    }, 1 * 1000)
  }
})
s.listen(8888)

var notes = fs.createReadStream(path.join(__dirname, 'notes.txt'));
notes.pipe(request.put('http://localhost:8888/newfile-3.txt'));

notes.on('end', function () {
  console.log('read end')
})