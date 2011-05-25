(funciton () {
  
  process.nextTick(function () {
    throw 'test';
  })
  
})()
