var spider = require('spider')

var s = spider()

s.route('2011.texasjavascript.com', '/', function (window, $) {

  console.log(Object.keys(this))

})

s.get('http://2011.texasjavascript.com/')