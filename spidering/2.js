var spider = require('spider')

var s = spider()

s.route('2011.texasjavascript.com', '/', function (window, $) {
  
  $('a').each(function () {
    console.log(this.getAttribute('href'))
  })
    
})

s.get('http://2011.texasjavascript.com/')
