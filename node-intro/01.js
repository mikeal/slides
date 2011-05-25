var fs = require('fs');

fs.readFile('hello.txt', function (error, buffer) {
  if (error) throw error;
  console.log(buffer.toString());
})
