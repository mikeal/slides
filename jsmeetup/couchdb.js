var request = require('request')
  ;
  
var h = {accept:'application/json', 'content-type':'application/json'};
    
request.put({url:'http://localhost:5984/testdb/64ed58994e288f8a2a088ac02e000879?rev=1-a91ea540641fa7c3c961b7ede1ad083a', headers:h, body:JSON.stringify({a:'asdf'})}, function (e, resp, body) {
  if (e) throw e; 
  var obj = JSON.parse(body);
  console.dir(obj);
})