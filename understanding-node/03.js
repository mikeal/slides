var events = require('events');

process.nextTick(function () {
  console.log('nextTick');
})

var e = new events.EventEmitter();

e.emit('one');

e.on('one', function () {console.log('one')});
e.on('two', function () {console.log('two')});
e.on('three', function () {console.log('three')});
e.on('four', function () {console.log('four')});

e.on('two', function () {
  e.emit('three');
})
e.on('three', function () {
  e.emit('four');
})

e.emit('two');
