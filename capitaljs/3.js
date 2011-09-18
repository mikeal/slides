var argv = require('optimist')
           .default('x', 10)
           .default('y', 10)
           .argv
           ;

console.log(argv);



