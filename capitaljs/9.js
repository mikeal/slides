var http = require('http')
  , request = require('request')
  ;

http.createServer(function (req, resp) {
  req.pipe(request('http://www.google.com' + req.url)).pipe(resp)
}).listen(1337)