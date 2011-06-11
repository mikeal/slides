var spider = require('spider')
  , talks = []
  ;

var s = spider()

s.route('2011.texasjavascript.com', '/', function (window, $) {
  $('hgroup').each(function () {
    var talk = {}
      , t = $(this)
      ;
    talk.speaker = t.find('h4').text()
    talk.title = t.find('h5').text()  
    talk.time = t.parent().parent().find('th').text()
    talk.path = $(t.parent().find('a')[0]).text().slice('spkr8.com'.length)
    if (talk.path) {
      s.route('spkr8.com', talk.path, function (window, $) {
        talk.description = $('div.description').text()
        talks.push(talk)
        console.log(talk)
      })
      s.get('http://spkr8.com'+talk.path)
    }    
  })
})

s.get('http://2011.texasjavascript.com/')
