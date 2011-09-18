var request = require('request')
  , fs = require('fs')
  , http = require('http')
  , path = require('path')
  , doodleurl ='http://www.google.com/intl/en_com/images/srpr/logo3w.png'
  , doodle3 = path.join(__dirname, 'doodle3.png')
  ;

var s = http.createServer(function (req, resp) {
  console.log(req.headers)
  var f = fs.createWriteStream(doodle3)
  req.pipe(f)
  req.on('end', function () {
    resp.writeHead(201)
    resp.end()
    s.close()
  })
})

s.listen(1337, function () {
  request.get(doodleurl).pipe(request.put('http://localhost:1337'))
})