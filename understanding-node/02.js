var fs = require('fs');

fs.readFile('hello.txt', function (error, buffer) {
  if (error) throw error;
  console.log(buffer.toString());
})

process.nextTick(function () {
  console.log('next tick');
})

console.log('done.')