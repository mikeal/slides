var argv = require('optimist')
           .usage('Usage: $0 -x [num] -y [num]')
           .demand(['x','y'])
           .argv
           ;

console.log(argv)