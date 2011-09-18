var request = require('request')
  , fs = require('fs')
  , http = require('http')
  , path = require('path')
  , doodle = path.join(__dirname, 'doodle.png')
  , doodle2 = path.join(__dirname, 'doodle2.png')
  ;

var s = http.createServer(function (req, resp) {
  console.log(req.headers)
  var f = fs.createWriteStream(doodle2)
  req.pipe(f)
  req.on('end', function () {
    resp.writeHead(201)
    resp.end()
    s.close()
  })
})

s.listen(1337, function () {
  fs.createReadStream(doodle).pipe(request.put('http://localhost:1337'))
})