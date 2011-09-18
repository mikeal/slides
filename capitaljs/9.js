var http = require('http')
  , request = require('request')
  ;

http.createServer(function (req, resp) {
  var x = request('http://www.google.com' + req.url)
  req.pipe(x)
  x.pipe(resp)
}).listen(1337)