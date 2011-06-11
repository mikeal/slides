var spider = require('spider')

var s = spider()

s.route('2011.texasjavascript.com', '/', function (window, $) {
  
  $('a').each(function () {
    console.log(this.getAttribute('href'))
  })
  
  $('a').spider()
  
})
s.route('spkr8.com', '/t/:id', function (window, $) {
  
  console.log('spkr8!', this.params.id)
  
})

s.get('http://2011.texasjavascript.com/')
